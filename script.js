// Global variables
let isRecording = false;
let hasTranscript = false;

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Text Q&A Functions
async function submitQuestion() {
    const questionInput = document.getElementById('question-input');
    const question = questionInput.value.trim();

    if (!question) {
        alert('Please enter a question first.');
        return;
    }

    // Show loading
    document.getElementById('text-loading').classList.remove('hidden');
    document.getElementById('text-answer').classList.add('hidden');
    document.getElementById('submit-question-btn').disabled = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock response
    const mockResponse = {
        answer: "Based on medical literature, dehydration symptoms typically include: increased thirst, dry mouth, decreased urination, dark-colored urine, fatigue, dizziness, and confusion. Mild dehydration can often be treated by drinking water or electrolyte solutions. However, severe dehydration requires immediate medical attention.",
        confidence: "92%",
        references: "Mayo Clinic, WebMD, NIH"
    };

    // Display results
    document.getElementById('answer-content').textContent = mockResponse.answer;
    document.getElementById('answer-confidence').textContent = mockResponse.confidence;
    document.getElementById('answer-references').textContent = mockResponse.references;

    // Hide loading and show results
    document.getElementById('text-loading').classList.add('hidden');
    document.getElementById('text-answer').classList.remove('hidden');
    document.getElementById('submit-question-btn').disabled = false;
}

// Image Analysis Functions
function previewImage() {
    const fileInput = document.getElementById('image-upload');
    const preview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const analyzeBtn = document.getElementById('analyze-image-btn');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            preview.classList.remove('hidden');
            analyzeBtn.disabled = false;
            analyzeBtn.classList.remove('opacity-50');
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

async function analyzeImage() {
    // Show loading
    document.getElementById('image-loading').classList.remove('hidden');
    document.getElementById('image-result').classList.add('hidden');
    document.getElementById('analyze-image-btn').disabled = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock analysis result
    const mockResult = {
        classification: "The image appears to show a skin lesion consistent with a benign mole. The lesion has regular borders, uniform color, and symmetrical appearance, which are positive indicators.",
        confidence: "87%",
        recommendation: "Routine monitoring recommended"
    };

    // Display results
    document.getElementById('classification-result').textContent = mockResult.classification;
    document.getElementById('image-confidence').textContent = mockResult.confidence;
    document.getElementById('image-recommendation').textContent = mockResult.recommendation;

    // Hide loading and show results
    document.getElementById('image-loading').classList.add('hidden');
    document.getElementById('image-result').classList.remove('hidden');
    document.getElementById('analyze-image-btn').disabled = false;
}

// Voice Input Functions
async function toggleRecording() {
    const recordBtn = document.getElementById('record-btn');
    const recordingStatus = document.getElementById('recording-status');
    const transcriptDisplay = document.getElementById('transcript-display');
    const analyzeVoiceBtn = document.getElementById('analyze-voice-btn');

    if (!isRecording) {
        // Start recording
        isRecording = true;
        recordBtn.textContent = '🔴 Stop Recording';
        recordBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
        recordBtn.classList.add('bg-gray-600', 'hover:bg-gray-700');
        recordingStatus.classList.remove('hidden');

        // Simulate recording for 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Stop recording automatically for demo
        toggleRecording();
    } else {
        // Stop recording
        isRecording = false;
        recordBtn.textContent = '🎤 Start Recording';
        recordBtn.classList.remove('bg-gray-600', 'hover:bg-gray-700');
        recordBtn.classList.add('bg-red-600', 'hover:bg-red-700');
        recordingStatus.classList.add('hidden');

        // Show mock transcript
        const mockTranscript = "I've been having headaches for the past few days, especially in the morning. They seem to get better as the day goes on. Should I be concerned?";
        document.getElementById('transcript-text').textContent = mockTranscript;
        transcriptDisplay.classList.remove('hidden');

        hasTranscript = true;
        analyzeVoiceBtn.disabled = false;
        analyzeVoiceBtn.classList.remove('opacity-50');
    }
}

async function analyzeVoice() {
    if (!hasTranscript) {
        alert('Please record your voice first.');
        return;
    }

    // Show loading
    document.getElementById('voice-loading').classList.remove('hidden');
    document.getElementById('voice-response').classList.add('hidden');
    document.getElementById('analyze-voice-btn').disabled = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock response
    const mockInterpretation = "Based on your description of morning headaches that improve throughout the day, this could be related to several factors including sleep position, dehydration, caffeine withdrawal, or tension. Morning headaches can sometimes indicate sleep disorders or high blood pressure. I recommend: 1) Maintaining regular sleep schedule, 2) Staying hydrated, 3) Monitoring blood pressure, and 4) Consulting a healthcare provider if headaches persist or worsen.";

    // Display results
    document.getElementById('voice-interpretation').textContent = mockInterpretation;

    // Hide loading and show results
    document.getElementById('voice-loading').classList.add('hidden');
    document.getElementById('voice-response').classList.remove('hidden');
    document.getElementById('analyze-voice-btn').disabled = false;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial button states
    document.getElementById('analyze-image-btn').classList.add('opacity-50');
    document.getElementById('analyze-voice-btn').classList.add('opacity-50');

    // Add focus styles to all interactive elements
    const focusElements = document.querySelectorAll('button, input, textarea, a[href]');
    focusElements.forEach(element => {
        element.classList.add('focus-ring');
    });
});