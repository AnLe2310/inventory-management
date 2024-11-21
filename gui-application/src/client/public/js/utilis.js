function showToast(message, type, duration = 3000) {
    const toastContainer = document.getElementById("toast-container");
    const toastId = `toast-${Date.now()}`;

    const toast = document.createElement("div");
    toast.id = toastId;
    toast.className = `alert alert-${type} p-2 flex justify-between text-white`;

    toast.innerHTML = `
        <div>
            <i class="fa-sharp fa-regular ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-xmark' : type === 'info' ? 'fa-circle-info' : 'fa-triangle-exclamation'}"></i>
            <span class="text-wrap">${message}</span>
        </div>
        <button class="btn btn-${type} btn-xs btn-circle text-white" onclick="closeToast('${toastId}')">
            <i class="fa-light fa-xmark"></i>
        </button>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => { closeToast(toastId); }, duration);
}

function closeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.style.animation = 'toast-pop-out 0.5s ease-out forwards';
        setTimeout(() => { toast.remove(); }, 500);
    }
}

function convertPlaceHbs(template, options = { from: { start: "%", end: "%" }, to: { start: "{{", end: "}}" } }) {
    try {
        const { from, to } = options;
        const startRegex = new RegExp(from.start.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '([^]*?)' + from.end.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
        // Tìm các cặp mở và đóng trong template

        return template.replace(startRegex, function (match, p1) {
            // Thực hiện thay thế trong từng cặp
            return to.start + p1.replace(new RegExp(to.start.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g'), from.start)
                .replace(new RegExp(to.end.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g'), from.end) + to.end;
        });
    } catch (e) {
        console.log(e);
    }
}

function formatDate(dateStr, output = "dd/mm/yyyy", input = "yyyy-mm-dd") {
    let day, month, year;

    const datePart = dateStr.split("T")[0].split(" ")[0];

    switch (input.split(" ")[0]) {
        case "dd-mm-yyyy": [day, month, year] = datePart.split("-"); break;
        case "mm-dd-yyyy": [month, day, year] = datePart.split("-"); break;
        case "yyyy-mm-dd": [year, month, day] = datePart.split("-"); break;
        case "yyyy-dd-mm": [year, day, month] = datePart.split("-"); break;
        case "dd/mm/yyyy": [day, month, year] = datePart.split("/"); break;
        case "mm/dd/yyyy": [month, day, year] = datePart.split("/"); break;
        case "yyyy/mm/dd": [year, month, day] = datePart.split("/"); break;
        case "yyyy/dd/mm": [year, day, month] = datePart.split("/"); break;
        default: throw new Error("Định dạng đầu vào không được hỗ trợ");
    }

    const date = new Date(year, month - 1, day);
    day = String(date.getDate()).padStart(2, "0");
    month = String(date.getMonth() + 1).padStart(2, "0");
    year = date.getFullYear();

    return output
        .replace("dd", day)
        .replace("mm", month)
        .replace("yyyy", year);
}

function eq(a, b) {
    return a === b;
}

Handlebars.registerHelper("formatDate", formatDate);
Handlebars.registerHelper('eq', eq);
