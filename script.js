// Function to populate submission details on the submission view page
function populateSubmissionDetails() {
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    const submissionDetailsDiv = document.getElementById("submission-details");

    if (submissions.length === 0) {
        submissionDetailsDiv.innerHTML = "<p>No submissions found.</p>";
        return;
    }

    submissions.forEach((submission, index) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `
            <h4>Submission ${index + 1}</h4>
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Father's Name:</strong> ${submission.father}</p>
            <p><strong>Anniversary:</strong> ${submission.anniversary}</p>
            <p><strong>Address:</strong> ${submission.address}</p>
            <p><strong>Voter ID:</strong> ${submission.voterID}</p>
            <p><strong>Gram:</strong> ${submission.gram}</p>
            <p><strong>Samiti:</strong> ${submission.samiti}</p>
            <p><strong>Mobile:</strong> ${submission.mobile}</p>
            <p><strong>Present Post:</strong> ${submission.presentPost}</p>
            <p><strong>Past Post:</strong> ${submission.pastPost}</p>
            <p><strong>Work:</strong> ${submission.work}</p>
            <p><strong>DOB:</strong> ${submission.dob}</p>
            <img src="${submission.image}" alt="Uploaded Image" style="max-width: 200px; height: auto;">
            <button onclick="deleteSubmission(${index})">Delete</button>
            <button onclick="printDetails(${index})">Print</button>
        `;
        submissionDetailsDiv.appendChild(entryDiv);
    });
}

// Function to handle deletion of a submission
function deleteSubmission(index) {
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.splice(index, 1); // Remove the submission at the given index
    localStorage.setItem("submissions", JSON.stringify(submissions)); // Update local storage
    window.location.reload(); // Reload the page to refresh the submission view
}

// Function to print submission details
function printDetails(index) {
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    const submission = submissions[index];

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Submission</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h4 { color: #333; }
                    img { max-width: 100%; height: auto; }
                </style>
            </head>
            <body>
                <h4>Submission ${index + 1}</h4>
                <p><strong>Name:</strong> ${submission.name}</p>
                <p><strong>Father's Name:</strong> ${submission.father}</p>
                <p><strong>Anniversary:</strong> ${submission.anniversary}</p>
                <p><strong>Address:</strong> ${submission.address}</p>
                <p><strong>Voter ID:</strong> ${submission.voterID}</p>
                <p><strong>Gram:</strong> ${submission.gram}</p>
                <p><strong>Samiti:</strong> ${submission.samiti}</p>
                <p><strong>Mobile:</strong> ${submission.mobile}</p>
                <p><strong>Present Post:</strong> ${submission.presentPost}</p>
                <p><strong>Past Post:</strong> ${submission.pastPost}</p>
                <p><strong>Work:</strong> ${submission.work}</p>
                <p><strong>DOB:</strong> ${submission.dob}</p>
                <img src="${submission.image}" alt="Uploaded Image">
                <script>
                    window.onload = function() { window.print(); window.close(); };
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

// Update function
function updateSubmission(index) {
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    const submission = submissions[index];

    // Populate form fields with existing data
    document.getElementById("name").value = submission.name;
    document.getElementById("father").value = submission.father;
    document.getElementById("Anniversary").value = submission.anniversary;
    document.getElementById("Address").value = submission.address;
    document.getElementById("Voter").value = submission.voterID;
    document.getElementById("Gram").value = submission.gram;
    document.getElementById("Samiti").value = submission.samiti;
    document.getElementById("mobile").value = submission.mobile;
    document.getElementById("present").value = submission.presentPost;
    document.getElementById("past").value = submission.pastPost;
    document.getElementById("work").value = submission.work;
    document.getElementById("dob").value = submission.dob;

    // Store index in local storage to identify which submission to update
    localStorage.setItem("updateIndex", index);

    // Redirect to the form page to make updates
    window.location.href = "index.html";
}

// On form submission, check if we are updating an existing entry
if (window.location.pathname.includes("index.html")) {
    const userForm = document.getElementById("userForm");

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const userDetails = {
            name: document.getElementById("name").value,
            father: document.getElementById("father").value,
            anniversary: document.getElementById("Anniversary").value,
            address: document.getElementById("Address").value,
            voterID: document.getElementById("Voter").value,
            gram: document.getElementById("Gram").value,
            samiti: document.getElementById("Samiti").value,
            mobile: document.getElementById("mobile").value,
            presentPost: document.getElementById("present").value,
            pastPost: document.getElementById("past").value,
            work: document.getElementById("work").value,
            dob: document.getElementById("dob").value
        };

        // Handle image upload
        const imageFile = document.getElementById("image").files[0];
        const reader = new FileReader();
        
        reader.onloadend = function () {
            userDetails.image = reader.result; // Store the Base64 string of the image

            let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

            // Check if we're updating an existing submission
            const updateIndex = localStorage.getItem("updateIndex");
            if (updateIndex !== null) {
                submissions[updateIndex] = userDetails; // Update the existing entry
                localStorage.removeItem("updateIndex"); // Clear the index after updating
            } else {
                submissions.push(userDetails); // Add a new entry
            }

            localStorage.setItem("submissions", JSON.stringify(submissions));
            window.location.href = "submission-view.html"; // Redirect to the submission view page
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile); // Convert image file to Base64
        } else {
            // If no image is selected, continue without it
            let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
            const updateIndex = localStorage.getItem("updateIndex");
            if (updateIndex !== null) {
                submissions[updateIndex] = userDetails; // Update the existing entry
                localStorage.removeItem("updateIndex"); // Clear the index after updating
            } else {
                submissions.push(userDetails); // Add a new entry
            }

            localStorage.setItem("submissions", JSON.stringify(submissions));
            window.location.href = "submission-view.html"; // Redirect to the submission view page
        }
    });
}

// Call function to populate submissions if on submission view page
if (window.location.pathname.includes("submission-view.html")) {
    populateSubmissionDetails();
}
