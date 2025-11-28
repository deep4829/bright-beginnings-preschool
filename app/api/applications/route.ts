import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';
import { generateEmailHtml } from '@/lib/email-template';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = [
            'childName',
            'childAge',
            'dateOfBirth',
            'program',
            'schedule',
            'startDate',
            'parentName',
            'email',
            'phone',
            'address'
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate phone format
        const phoneRegex = /^[\d\s\-+()]{10,}$/;
        if (!phoneRegex.test(body.phone)) {
            return NextResponse.json(
                { error: 'Invalid phone format' },
                { status: 400 }
            );
        }

        // Validate age range
        const age = parseInt(body.childAge, 10);
        if (age < 2 || age > 5) {
            return NextResponse.json(
                { error: 'Child age must be between 2 and 5 years' },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from('applications')
            .insert([
                {
                    child_name: body.childName,
                    child_age: body.childAge,
                    date_of_birth: body.dateOfBirth,
                    program: body.program,
                    schedule: body.schedule,
                    start_date: body.startDate,
                    parent_name: body.parentName,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                    additional_info: body.additionalInfo || null
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to save application', details: error },
                { status: 500 }
            );
        }

        // Send acknowledgment email using Nodemailer
        try {
            const programNames: { [key: string]: string } = {
                toddler: 'Toddler Program (Ages 2-3)',
                preschool: 'Preschool Program (Ages 3-4)',
                prekindergarten: 'Pre-Kindergarten (Ages 4-5)'
            };

            // Create transporter
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.EMAIL_PORT || '587'),
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            // Generate HTML string directly
            const emailHtml = generateEmailHtml({
                parentName: body.parentName,
                childName: body.childName,
                program: programNames[body.program] || body.program,
                startDate: new Date(body.startDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            });

            // Send email
            const info = await transporter.sendMail({
                from: `"Bright Beginnings Preschool" <${process.env.EMAIL_USER}>`,
                to: body.email,
                subject: 'Application Received - Bright Beginnings Preschool',
                html: emailHtml,
            });

            console.log('Nodemailer email sent:', info.messageId);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Application submitted successfully!',
                data
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
