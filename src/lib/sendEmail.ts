// src/lib/sendEmail.ts

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (formData: FormData): Promise<void> => {
  console.log('Simulating sending email...');
  console.log('Form Data:', formData);

  return new Promise((resolve, reject) => {
    // Simulate a network request delay
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% chance of success, 10% chance of failure for testing

      if (success) {
        console.log('Email simulated successfully sent!');
        resolve();
      } else {
        console.error('Email simulated failed!');
        reject(new Error('Failed to send email. Please try again later.'));
      }
    }, 1500); // Simulate 1.5 second network delay
  });
};