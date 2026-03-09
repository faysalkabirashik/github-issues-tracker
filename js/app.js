console.log("Main page loaded");

const issuesContainer = document.getElementById("issues-container");

function loadIssues() {

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

        .then(function (res) {
            return res.json();
        })

        .then(function (data) {

            const issues = data.data;

            displayIssues(issues);

        });

}



function displayIssues(issues) {

    issuesContainer.innerHTML = "";

    issues.forEach(function (issue) {

        const div = document.createElement("div");

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

        let labelsHTML = "";

        if (issue.labels && issue.labels.length > 0) {

            issue.labels.forEach(function (label) {

                if (label === "bug") {
                    labelsHTML += `
<span style="color:#EF4444;background:#FEECEC;border:1px solid #FECACA"
class="text-xs px-2 py-1 rounded-md">
🐞 BUG
</span>`;
                }

                else if (label === "help wanted") {
                    labelsHTML += `
<span style="color:#D97706;background:#FFF8DB;border:1px solid #FDE68A"
class="text-xs px-2 py-1 rounded-md">
⚠ HELP WANTED
</span>`;
                }

                else if (label === "enhancement") {
                    labelsHTML += `
<span style="color:#00A96E;background:#DEFCE8;border:1px solid #BBF7D0"
class="text-xs px-2 py-1 rounded-md">
✨ ENHANCEMENT
</span>`;
                }

            });

        }
        else {

            labelsHTML = `
<span class="text-xs text-gray-400">
No label
</span>
`;

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



loadIssues();