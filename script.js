document.getElementById('fetchButton').addEventListener('click', fetchRandomArtwork);

async function fetchRandomArtwork() {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11';
    
    try {
        // fetch only objects from department 11 (European Paintings) (only bc i dont know how to filter through paintings yet...)
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data from the Met API');
        }

        const data = await response.json();

        // check if there are objects returned for department 11
        if (!data.objectIDs || data.objectIDs.length === 0) {
            throw new Error('No Paintings found in department 11');
        }

        // get a random object ID from department 11
        const randomObjectId = data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];

        // fetch detailed information for the random object
        const objectDetailResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`);
        const objectDetail = await objectDetailResponse.json();

        // ensure the object has an image to display
        if (objectDetail.primaryImageSmall && objectDetail.primaryImage) {
            // display image, title, artist name, and link to the Met page
            document.getElementById('artImage').src = objectDetail.primaryImageSmall;
            document.getElementById('artTitle').textContent = objectDetail.title ? objectDetail.title : 'Untitled Artwork';
            document.getElementById('artistName').textContent = objectDetail.artistDisplayName ? objectDetail.artistDisplayName : 'Artist Unknown';

            // link to the high-resolution image when clicked
            document.getElementById('artImageLink').href = objectDetail.primaryImage;  // High-resolution image

            // link to the Met's page for this artwork
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
