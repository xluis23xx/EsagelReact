import * as React from "react";

function darkMode() {
  document.querySelectorAll(".bg-light").forEach((element) => {
    element.className = element.className.replace("bg-light", "bg-dark");
  });
  //   document.querySelectorAll(".text-dark").forEach((element) => {
  //     element.className = element.className.replace("text-dark", "text-light");
  //   });
  document.querySelectorAll(".nav-link").forEach((element) => {
    if (element.classList.contains("text-dark")) {
      element.className = element.className.replace("text-dark", "text-light");
    } else {
      element.classList.add("text-dark");
    }
  });
  document.querySelectorAll(".nav-title").forEach((element) => {
    if (element.classList.contains("text-dark")) {
      element.className.replace("text-dark", "text-light");
    } else {
      element.classList.add("text-dark");
    }
  });
  document.querySelectorAll(".nav-icon").forEach((element) => {
    if (element.classList.contains("text-dark")) {
      element.className.replace("text-dark", "text-light");
    } else {
      element.classList.add("text-dark");
    }
  });

  document.body.classList.add("bg-dark");
  //   localStorage.setItem("lightSwitch", "dark");
}
function lightMode() {
  document.querySelectorAll(".bg-dark").forEach((element) => {
    element.className = element.className.replace(/-dark/g, "-light");
  });
  document.querySelectorAll(".text-light").forEach((element) => {
    element.className = element.className.replace(/-light/g, "-dark");
  });
  document.querySelectorAll(".nav-link").forEach((element) => {
    if (element.classList.contains("text-light")) {
      element.className = element.className.replace("text-light", "text-dark");
    } else {
      element.classList.add("text-dark");
    }
  });
  document.querySelectorAll(".nav-title").forEach((element) => {
    if (element.classList.contains("text-light")) {
      element.className.replace("text-light", "text-dark");
    } else {
      element.classList.add("text-dark");
    }
  });
  document.querySelectorAll(".nav-icon").forEach((element) => {
    if (element.classList.contains("text-light")) {
      element.className.replace("text-light", "text-dark");
    } else {
      element.classList.add("text-dark");
    }
  });
  document.body.classList.add("bg-light");
  if (document.body.classList.contains("text-light")) {
    document.body.className.replace("text-light", "text-dark");
  } else {
    document.body.classList.add("text-dark");
  }
  //   localStorage.setItem("lightSwitch", "light");
}

export const ToggleButtonThemeComponent = () => {
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    const lightSwitch = localStorage.getItem("lightSwitch");
    if (lightSwitch) {
      if (lightSwitch === "light") {
        setIsChecked(false);
        lightMode();
      } else {
        setIsChecked(true);
        darkMode();
      }
    }
  }, []);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      lightMode();
    } else {
      darkMode();
    }
  };

  return (
    <div className="form-check form-switch my-auto me-3">
      <label className="form-check-label ms-3" htmlFor="lightSwitch">
        <svg
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-brightness-high"
          viewBox="0 0 16 16"
        >
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
        </svg>
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        checked={isChecked}
        onChange={() => handleOnChange()}
      />
    </div>
  );
};
