


console.log("Main page loaded");

const tabAll = document.getElementById("tab-all");
const tabOpen = document.getElementById("tab-open");
const tabClosed = document.getElementById("tab-closed");

const issueCount = document.getElementById("issue-count");
const spinner = document.getElementById("loading-spinner");


// modal er jonne
const modal = document.getElementById("issue-modal");

const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalAuthor = document.getElementById("modal-author");
const modalDate = document.getElementById("modal-date");
const modalLabels = document.getElementById("modal-labels");
const modalDescription = document.getElementById("modal-description");
const modalAssignee = document.getElementById("modal-assignee");
const modalPriority = document.getElementById("modal-priority");


let allIssues = [];


const issuesContainer = document.getElementById("issues-container");

// function loadIssues() {

//     fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

//         .then(function (res) {
//             return res.json();
//         })

//         .then(function (data) {

//             const issues = data.data;

//             displayIssues(issues);

//         });

// }
function loadIssues() {

    spinner.classList.remove("hidden");

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

        .then(function (res) {
            return res.json();
        })

        .then(function (data) {

            spinner.classList.add("hidden");

            allIssues = data.data;

            displayIssues(allIssues);

            updateIssueCount(allIssues);

        });

}


function displayIssues(issues) {

    issuesContainer.innerHTML = "";

    issues.forEach(function (issue) {

        const div = document.createElement("div");
        div.onclick = function () {

            openIssueModal(issue.id);

        };

        let borderColor = "";
        let statusIcon = "";

        if (issue.status === "open") {
            borderColor = "border-green-500";
            statusIcon = "./assets/Open-Status.png";
        }
        else {
            borderColor = "border-purple-500";
            statusIcon = "./assets/Closed- Status .png";
        }



        /* priority design */

        let priorityStyle = "";

        if (issue.priority === "high") {
            priorityStyle = "color:#EF4444;background:#FEECEC";
        }
        else if (issue.priority === "medium") {
            priorityStyle = "color:#F59E0B;background:#FFF6D1";
        }
        else {
            priorityStyle = "color:#9CA3AF;background:#EEEFF2";
        }



        /* labels */

/* labels */

let labelsHTML = "";

if (issue.labels && issue.labels.length > 0) {

issue.labels.forEach(function (label) {

if (label === "bug") {

labelsHTML += `
<span style="color:#EF4444;background:#FEECEC;border:1px solid #FECACA"
class="text-xs px-2 py-1 rounded-md flex items-center gap-1">

<img src="./assets/bug-droid.png" class="w-3 h-3">

BUG

</span>
`;

}

else if (label === "help wanted") {

labelsHTML += `
<span style="color:#D97706;background:#FFF8DB;border:1px solid #FDE68A"
class="text-xs px-2 py-1 rounded-md flex items-center gap-1">

<img src="./assets/help-Vector.png" class="w-3 h-3">

HELP WANTED

</span>
`;

}

else if (label === "enhancement") {

labelsHTML += `
<span style="color:#00A96E;background:#DEFCE8;border:1px solid #BBF7D0"
class="text-xs px-2 py-1 rounded-md flex items-center gap-1">

<img src="./assets/enhancement-Vector.png" class="w-3 h-3">

ENHANCEMENT

</span>
`;

}

});

}



        div.innerHTML = `

<div class="bg-white rounded-lg shadow-sm border-t-4 ${borderColor} hover:shadow-md transition cursor-pointer h-full flex flex-col">
<div class="p-4 flex flex-col flex-grow">


<!-- top row -->

<div class="flex justify-between items-center mb-3">

<img src="${statusIcon}" class="w-6">

<span class="text-xs px-3 py-1 rounded-full font-medium"
style="${priorityStyle}">
${issue.priority.toUpperCase()}
</span>

</div>



<!-- title -->

<h3 class="font-semibold text-sm mb-2 leading-5">
${issue.title}
</h3>



<!-- description -->

<p class="text-xs text-gray-500 mb-3 leading-5 flex-grow">

${issue.description.substring(0, 85)}...

</p>



<!-- labels -->

<div class="flex flex-wrap gap-2 mb-3">

${labelsHTML}

</div>

</div>



<!-- divider -->

<div class="border-t"></div>



<!-- bottom -->

<div class="px-4 py-3 text-xs text-gray-500 mt-auto">
#${issue.id} by ${issue.author}

<br>

${new Date(issue.createdAt).toLocaleDateString()}

</div>

</div>

`;

        issuesContainer.appendChild(div);

    });

}

function updateIssueCount(issues) {

    issueCount.innerText = issues.length + " Issues";

}

function setActiveTab(activeTab) {

    document.querySelectorAll(".tab-btn").forEach(function (btn) {

        btn.style.background = "";
        btn.classList.remove("text-white");

    });

    activeTab.style.background = "#4A00FF";
    activeTab.classList.add("text-white");

}

loadIssues();


tabAll.addEventListener("click", function () {

    setActiveTab(tabAll);

    displayIssues(allIssues);

    updateIssueCount(allIssues);

});



tabOpen.addEventListener("click", function () {

    setActiveTab(tabOpen);

    const openIssues = allIssues.filter(function (issue) {

        return issue.status === "open";

    });

    displayIssues(openIssues);

    updateIssueCount(openIssues);

});



tabClosed.addEventListener("click", function () {

    setActiveTab(tabClosed);

    const closedIssues = allIssues.filter(function (issue) {

        return issue.status === "closed";

    });

    displayIssues(closedIssues);

    updateIssueCount(closedIssues);

});


// modla part
function openIssueModal(id){

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

.then(res => res.json())

.then(data => {

const issue = data.data;

modal.classList.remove("hidden");

modalTitle.innerText = issue.title;


/* STATUS */

modalStatus.innerText = "Opened";

modalStatus.style.background = "#22C55E";


/* AUTHOR */

modalAuthor.innerText = "Opened by " + issue.author;


/* DATE */

modalDate.innerText = new Date(issue.createdAt).toLocaleDateString();


/* DESCRIPTION */

modalDescription.innerText = issue.description;


/* ASSIGNEE */

modalAssignee.innerText = issue.assignee || "Unassigned";


/* PRIORITY */

if(issue.priority === "high"){

modalPriority.innerHTML =
`<span class="px-3 py-1 rounded-full text-xs font-semibold"
style="color:#EF4444;background:#FEECEC">
HIGH
</span>`;

}

else if(issue.priority === "medium"){

modalPriority.innerHTML =
`<span class="px-3 py-1 rounded-full text-xs font-semibold"
style="color:#F59E0B;background:#FFF6D1">
MEDIUM
</span>`;

}

else{

modalPriority.innerHTML =
`<span class="px-3 py-1 rounded-full text-xs font-semibold"
style="color:#9CA3AF;background:#EEEFF2">
LOW
</span>`;

}


/* LABELS */

modalLabels.innerHTML = "";

issue.labels.forEach(label => {

const span = document.createElement("span");

span.className = "px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1";

let icon = "";
let style = "";

if(label === "bug"){

icon = "./assets/bug-droid.png";
style = "color:#EF4444;background:#FEECEC;border:1px solid #FECACA";

}

else if(label === "help wanted"){

icon = "./assets/help-Vector.png";
style = "color:#D97706;background:#FFF8DB;border:1px solid #FDE68A";

}

else if(label === "enhancement"){

icon = "./assets/enhancement-Vector.png";
style = "color:#00A96E;background:#DEFCE8;border:1px solid #BBF7D0";

}

span.style = style;

span.innerHTML = `
<img src="${icon}" class="w-3 h-3">
${label.toUpperCase()}
`;

modalLabels.appendChild(span);

});

});

}


function closeModal() {

    modal.classList.add("hidden");

}