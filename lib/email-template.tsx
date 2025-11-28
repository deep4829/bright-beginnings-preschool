interface EmailTemplateProps {
    parentName: string;
    childName: string;
    program: string;
    startDate: string;
}

export const generateEmailHtml = ({
    parentName,
    childName,
    program,
    startDate,
}: EmailTemplateProps): string => {
    return `
    <div style="font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9fafb;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
                <h1 style="color: #6366f1; font-size: 28px; margin: 0 0 10px 0; font-weight: 700;">
                    🎉 Application Received!
                </h1>
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                    Bright Beginnings Preschool
                </p>
            </div>

            <!-- Greeting -->
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Dear ${parentName},
            </p>

            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 25px;">
                Thank you for your interest in <strong>Bright Beginnings Preschool</strong>! We are delighted to confirm that we have received your application for <strong>${childName}</strong>.
            </p>

            <!-- Application Details Box -->
            <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 25px; border: 1px solid #e5e7eb;">
                <h2 style="font-size: 18px; color: #1f2937; margin: 0 0 15px 0; font-weight: 600;">
                    📋 Application Summary
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tbody>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">
                                Child's Name:
                            </td>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">
                                ${childName}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                                Program:
                            </td>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">
                                ${program}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                                Start Date:
                            </td>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">
                                ${startDate}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Next Steps -->
            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                <h3 style="font-size: 16px; color: #1e40af; margin: 0 0 10px 0; font-weight: 600;">
                    📌 What Happens Next?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; line-height: 1.8;">
                    <li>Our admissions team will review your application within <strong>24-48 hours</strong>.</li>
                    <li>We will contact you via email or phone to schedule an in-person visit.</li>
                    <li>Please feel free to reach out if you have any questions in the meantime.</li>
                </ul>
            </div>

            <!-- Contact Info -->
            <div style="background-color: #fef3c7; border-radius: 8px; padding: 15px 20px; margin-bottom: 25px;">
                <p style="font-size: 14px; color: #92400e; margin: 0; line-height: 1.6;">
                    <strong>📞 Contact Us:</strong><br />
                    Email: <a href="mailto:info@brightbeginnings.com" style="color: #b45309; text-decoration: none;">info@brightbeginnings.com</a><br />
                    Phone: <a href="tel:+911234567890" style="color: #b45309; text-decoration: none;">+91 123-456-7890</a><br />
                    Address: 123 Learning Lane, Education City
                </p>
            </div>

            <!-- Closing -->
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 10px;">
                We look forward to welcoming your family to Bright Beginnings!
            </p>

            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 0;">
                Warm regards,<br />
                <strong>The Bright Beginnings Team</strong>
            </p>

            <!-- Footer -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                    This is an automated confirmation email. Please do not reply to this message.
                </p>
            </div>
        </div>
    </div>
    `;
};
