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