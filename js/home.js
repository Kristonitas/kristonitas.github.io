document.querySelector(".projects").classList.add("js");

const toggle = document.querySelector(".skills .menu .toggle");
const menu = document.querySelector(".skills .menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("collapsed");
});

const skillItems = [];
const projectItems = [];
let selectedSkills = [];

const showSelectedProjects = () => {
  const showAll = selectedSkills.length === 0;
  let visibleIndex = 0;

  for (let i = 0; i < projectItems.length; i++) {
    const projectItem = projectItems[i];
    let show = showAll || projectItem.skills.some(s => selectedSkills.includes(s));

    if (show) {
      projectItem.item.classList.remove("hide");
      visibleIndex++;
    } else {
      projectItem.item.classList.add("hide");
    }
    projectItem.item.style.transform = `translateY(${Math.max(visibleIndex - 1, 0) * 100}%)`;
  }
}

const onSkillsSelected = (skills, selected) => {
  console.log(skills, selected);
  if (selected) {
    selectedSkills = [...selectedSkills, ...skills];
  } else {
    selectedSkills = selectedSkills.filter(s => !skills.includes(s));
  }
  showSelectedProjects();
}

const onCheckboxToggle = (e) => {
  const skillItem = skillItems.find(si => si.checkbox == e.target);
  onSkillsSelected([skillItem.skill], skillItem.checkbox.checked);
}

const skillList = document.querySelectorAll("#skill-list li");
for (let i = 0; i < skillList.length; i++) {
  const skillItem = skillList[i];
  const skillName = skillItem.attributes.skill.value;
  const checkbox = skillItem.querySelector(".checkbox");
  const obj = { skill: skillName, checkbox, projectItems: [] };
  skillItems.push(obj);

  checkbox.addEventListener("change", onCheckboxToggle, false);
}

const projectList = document.querySelectorAll(".projects .card");
for (let i = 0; i < projectList.length; i++) {
  const projectItem = projectList[i];
  const skills = projectItem.attributes.skills.value.split(",");
  skills.forEach(s => {
    skillItems.find(si => si.skill == s).projectItems.push(projectItem);
  });
  const obj = { skills, item: projectItem };
  projectItems.push(obj);

  projectItem.style.transition = "none";
  projectItem.style.transform = `translateY(${i * 100}%)`;
  projectItem.offsetHeight;
  projectItem.style.transition = "";
  projectItem.offsetHeight;
}
