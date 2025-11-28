// More detailed test with error logging
const testData = {
    childName: "Emma Thompson",
    childAge: "4",
    dateOfBirth: "2020-06-15",
    program: "preschool",
    schedule: "full",
    startDate: "2025-02-01",
    parentName: "Sarah Thompson",
    email: "deepshekhar429@gmail.com",
    phone: "9876543210",
    address: "456 Elm Street, Springfield",
    additionalInfo: "Looking forward to joining Bright Beginnings!"
};

console.log('Testing API with data:', testData);
console.log('Sending POST to: http://localhost:3000/api/applications');

fetch('http://localhost:3000/api/applications', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData),
})
    .then(async response => {
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('\n✅ SUCCESS! Data saved to Supabase');
        } else {
            console.log('\n❌ ERROR! Failed to save');
            const fs = require('fs');
            fs.writeFileSync('error-log.json', JSON.stringify(data, null, 2));
        }

        process.exit(response.ok ? 0 : 1);
    })
    .catch((error) => {
        console.error('\n❌ NETWORK ERROR:', error.message);
        process.exit(1);
    });
