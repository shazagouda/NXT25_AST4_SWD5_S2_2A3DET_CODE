document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('signatureCanvas');
    if (!canvas) return; // Not on the sign page

    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clearBtn');
    const signBtn = document.getElementById('signBtn');
    const agreeCheck = document.getElementById('agreeCheck');
    const signatureDataInput = document.getElementById('signatureData');
    const sigStatus = document.getElementById('sigStatus');

    let isDrawing = false;
    let hasSignature = false;
    
    // Set up canvas styling
    ctx.strokeStyle = '#0A1628';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function getCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        
        // Handle touch events
        if (event.touches && event.touches.length > 0) {
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
            };
        }
        
        // Handle mouse events
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        const coords = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const coords = getCoordinates(e);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        
        if (!hasSignature) {
            hasSignature = true;
            updateStatus();
        }
    }

    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            ctx.closePath();
            updateSignatureData();
        }
    }

    // Event Listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    // Touch support
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    window.clearSignature = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hasSignature = false;
        signatureDataInput.value = '';
        updateStatus();
    };

    agreeCheck.addEventListener('change', updateStatus);

    function updateStatus() {
        if (hasSignature) {
            sigStatus.innerHTML = '<span class="sig-captured">✓ Signature Captured</span>';
        } else {
            sigStatus.innerHTML = '<span class="sig-empty">Draw your signature above</span>';
        }
        
        // Enable/Disable submit button
        signBtn.disabled = !(hasSignature && agreeCheck.checked);
    }

    function updateSignatureData() {
        // Save as base64 PNG
        const dataUrl = canvas.toDataURL('image/png');
        signatureDataInput.value = dataUrl;
    }
    
    // Prevent form submit if not signed
    document.getElementById('signForm').addEventListener('submit', function(e) {
        if (!hasSignature || !agreeCheck.checked) {
            e.preventDefault();
            alert('Please draw your signature and agree to the terms.');
        }
    });
});
