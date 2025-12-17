
async function main() {
    const baseUrl = 'http://localhost:3000';

    console.log('--- Testing /api/user ---');
    try {
        const res = await fetch(`${baseUrl}/api/user`);
        const status = res.status;
        const data = await res.json();
        console.log(`Status: ${status}`);
        console.log('Data:', data);

        // If we have users, let's test fetching the first one specifically
        if (Array.isArray(data) && data.length > 0) {
            const firstUser = data[0];
            console.log(`\n--- Testing /api/user/${firstUser.id} ---`);
            const resDetail = await fetch(`${baseUrl}/api/user/${firstUser.id}`);
            console.log(`Status: ${resDetail.status}`);
            console.log('Data:', await resDetail.json());
        } else {
            console.log('\nNo users found to test detail route.');
        }

    } catch (error) {
        console.error('Error fetching data. Is the server running?');
        console.error(error);
    }
}

main();
