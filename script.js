document.getElementById('fetchButton').addEventListener('click', fetchRandomArtwork);

async function fetchRandomArtwork() {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11';
    
    try {
        // Fetch only objects from department 11 (European Paintings)
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data from the Met API');
        }

        const data = await response.json();

        // Check if there are objects returned for department 11
        if (!data.objectIDs || data.objectIDs.length === 0) {
            throw new Error('No Paintings found in department 11');
        }

        // Get a random object ID from department 11
        const randomObjectId = data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];

        // Fetch detailed information for the random object
        const objectDetailResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`);
        const objectDetail = await objectDetailResponse.json();

        // Ensure the object has an image to display
        if (objectDetail.primaryImageSmall && objectDetail.primaryImage) {
            // Display image, title, artist name, and link to the Met page
            document.getElementById('artImage').src = objectDetail.primaryImageSmall;
            document.getElementById('artTitle').textContent = objectDetail.title ? objectDetail.title : 'Untitled Artwork';
            document.getElementById('artistName').textContent = objectDetail.artistDisplayName ? objectDetail.artistDisplayName : 'Artist Unknown';

            // Link to the high-resolution image when clicked
            document.getElementById('artImageLink').href = objectDetail.primaryImage;  // High-resolution image

            // Link to the Met's page for this artwork
            const metUrl = `https://www.metmuseum.org/art/collection/search/${randomObjectId}`;
            document.getElementById('artLink').href = metUrl;
            document.getElementById('artLink').textContent = 'View on The Met Gallery';
        } else {
            document.getElementById('artImage').src = '';
            document.getElementById('artTitle').textContent = 'No image available';
            document.getElementById('artistName').textContent = '';
            document.getElementById('artLink').href = '';
            document.getElementById('artLink').textContent = '';
        }
    } catch (error) {
        console.error('Error fetching artwork:', error);
        document.getElementById('artTitle').textContent = 'Error fetching artwork. Please try again later.';
        document.getElementById('artistName').textContent = '';
        document.getElementById('artLink').href = '';
        document.getElementById('artLink').textContent = '';
    }
}


// document.getElementById('fetchButton').addEventListener('click', fetchRandomArtwork);

// async function fetchRandomArtwork() {
//     const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11';
    
//     try {
//         // Fetch only objects from department 11 (European Paintings)
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the Met API');
//         }

//         const data = await response.json();

//         // Check if there are objects returned for department 11
//         if (!data.objectIDs || data.objectIDs.length === 0) {
//             throw new Error('No Paintings found in department 11');
//         }

//         // Get a random object ID from department 11
//         const randomObjectId = data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];

//         // Fetch detailed information for the random object
//         const objectDetailResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`);
//         const objectDetail = await objectDetailResponse.json();

//         // Ensure the object has an image to display
//         if (objectDetail.primaryImageSmall) {
//             // Display image, title, artist name, and link to the Met page
//             document.getElementById('artImage').src = objectDetail.primaryImageSmall;
//             document.getElementById('artTitle').textContent = objectDetail.title ? objectDetail.title : 'Untitled Artwork';
//             document.getElementById('artistName').textContent = objectDetail.artistDisplayName ? objectDetail.artistDisplayName : 'Artist Unknown';

//             // Link to the Met's page for this artwork
//             const metUrl = `https://www.metmuseum.org/art/collection/search/${randomObjectId}`;
//             document.getElementById('artLink').href = metUrl;
//             document.getElementById('artLink').textContent = 'View on The Met Gallery';
//         } else {
//             document.getElementById('artImage').src = '';
//             document.getElementById('artTitle').textContent = 'No image available';
//             document.getElementById('artistName').textContent = '';
//             document.getElementById('artLink').href = '';
//             document.getElementById('artLink').textContent = '';
//         }
//     } catch (error) {
//         console.error('Error fetching artwork:', error);
//         document.getElementById('Title').textContent = 'Error fetching artwork. Please try again later.';
//         document.getElementById('artistName').textContent = '';
//         document.getElementById('artLink').href = '';
//         document.getElementById('artLink').textContent = '';
//     }
// }


// document.getElementById('fetchButton').addEventListener('click', fetchRandomArtwork);

// async function fetchRandomArtwork() {
//     const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11';
    
//     try {
//         // Fetch only objects from department 11 (European Paintings)
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the Met API');
//         }

//         const data = await response.json();

//         // Check if there are objects returned for department 11
//         if (!data.objectIDs || data.objectIDs.length === 0) {
//             throw new Error('No European Paintings found in department 11');
//         }

//         // Get a random object ID from department 11
//         const randomObjectId = data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];

//         // Fetch detailed information for the random object
//         const objectDetailResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`);
//         const objectDetail = await objectDetailResponse.json();

//         // Ensure the object has an image to display
//         if (objectDetail.primaryImageSmall) {
//             // Display image and title
//             document.getElementById('artImage').src = objectDetail.primaryImageSmall;
//             document.getElementById('artTitle').textContent = objectDetail.title ? objectDetail.title : 'Untitled Artwork';
//         } else {
//             document.getElementById('artImage').src = '';
//             document.getElementById('artTitle').textContent = 'No image available';
//         }
//     } catch (error) {
//         console.error('Error fetching artwork:', error);
//         document.getElementById('artTitle').textContent = 'Error fetching artwork. Please try again later.';
//     }
// }
