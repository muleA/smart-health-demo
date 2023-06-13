import React, { useRef, useState } from "react";
import { exportComponentAsPNG } from "react-component-export-image";

const App = () => {
  const certificateWrapper = useRef(null);
  const [name, setName] = useState("");

  const handleNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(e.target.value);
  };

  const handleDownload = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    exportComponentAsPNG(certificateWrapper, {
      html2CanvasOptions: { backgroundColor: null }
    });
  };

  return (
    <>
    <div className="App">
      <div className="Meta">
        <h1 className="font-hachi text-3xl">ACM Certificates</h1>
        <p>Please enter your name.</p>
        <input
          type="text"
          placeholder="Please enter your name..."
          value={name}
          onChange={handleNameChange}
          className="font-inherit p-2 w-full shadow-md border-2 border-gray-400 rounded-md"
        />
        <button
          onClick={handleDownload}
          className="p-4 border-2 border-blue-300 bg-blue-200 font-inherit my-5 rounded-lg cursor-pointer"
        >
          Download
        </button>
      </div>

      <div id="downloadWrapper" ref={certificateWrapper} className="p-4">
      <div className="container mx-auto p-20 border-2 border-black rounded bg-yellow-300 flex flex-col">

      <div className="container mx-auto p-20 border-2 border-black rounded bg-yellow-300">
      <div className="header">
        <div className="content flex mb-20">
          <div className="left-header">
            <img src="https://media.licdn.com/dms/image/D4E03AQG4jgEziXXBEg/profile-displayphoto-shrink_400_400/0/1677379760383?e=1691625600&v=beta&t=6Kzp_ovzQASomlB5_6q0Y7-EYRBZ45dhtbtkHK_OtBE" alt="User" className="user-image w-32 h-32 rounded-full" />
          </div>
          <div className="center-header">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHoAawMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABgMEBQcBAv/EAEMQAAIBAgQEBAIFCAgHAQAAAAECAwQRAAUSIQYTMUEiUWFxFIEVMpGhsSNCUmJygsHwJTM0Q1OT0eEkNURUY5LSF//EABsBAAEFAQEAAAAAAAAAAAAAAAACAwQFBgEH/8QAOREAAQMCBAIHCAEDBAMAAAAAAQACAwQRBRIhMUFREyJhcYGR8AYUMqGxwdHhM0JS8SMkorIVNWL/2gAMAwEAAhEDEQA/AO44EIwIRgQjAhGBCMCEYEIwIRgQjAhGBCMCEYEIwIRgQjAhGBCMCFFPUw0yGSolSJB1Z2Cj78dAJNguEgalUPp6gb+oM1R608DyD7QLYc6F/HRI6VvDVefTa9svr/8AJ/3xzo//AKHmu5z/AGnyXv07Sr/XRVkA7mSmcAfMC2O9E7hY+K50rRv9CrdJX0laL0lTFNbrocG3vhDmubuEpr2u2Ks4SlIwIRgQjAhGBCMCEYEKCsq4KKBp6qVYol6sx79h6n0wprS42ASXODRcpUzziz4YFWdqJSLrHoDVLjsdJ2jHq1z6Y650cW+p+Sl0eH1dbrGMreShcXynKT2JFgZI7WQrgEisvjfdK9HzfTTN1i3KLdDKFNNV3K7kE5wSfLuvUGenXxGR/4Cu5kW6F1oLj+Thfwk8ZB4eRU7/nDuhPj46NQbK2zLfcZZFsD7zrdi/4LO5N4ZSc0gWdOr8Ulwz/cFD/6Zoqj+EmW7L2x2fFp4/UikUfJgMoD8u+uD5P+umLlZ/tLh/X3XP4N+mLU6+hdLZHUzSFDb7kY6q6N9O9GKwvbyHydUab45hW30Mf8AOsRGeDk+1c0/4LK7k3hZF3LWRuSzJF7Nb0t+3CfkfQU9wOq9wV9WUU6RG9s79Hjtwr4S9SMhGbTG5Dd9VWZfhLkktnB/bq7K8ld+8vfSSOYz+DQoDzWhe1o8m4t1kRwL0zC9m3fDk/8A1Xj6Id9eYxEiowKCKgCiIoAoiKAIoiIAiKKACiiigAooooAKKKKACiiigD//Z" alt="Company Logo" className="company-logo w-32 h-32" />
          </div>
          <div className="right-header">
            <h1 className="text-3xl font-bold">Certificate of Completion</h1>
            <p className="text-lg">Presented to:</p>
            <p className="text-2xl font-bold">John Doe</p>
          </div>
        </div>
      </div>
      <div className="content">
        <h2 className="text-2xl font-bold mb-10">Course Details</h2>
        <div className="course-info mb-10">
          <p className="text-lg">
            Course Name: <span className="font-bold">Introduction to React</span>
          </p>
          <p className="text-lg">
            Instructor: <span className="font-bold">Jane Smith</span>
          </p>
          <p className="text-lg">
            Date: <span className="font-bold">June 10, 2023</span>
          </p>
        </div>
        <div className="signature-section">
          <p className="text-lg mb-4">Signature:</p>
          <img src="https://example.com/signature.jpg" alt="Signature" className="signature w-64 h-16" />
        </div>
      </div>
    </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default App;
