const createElement = (arr) => {
  const htmlElements = arr.map(
    (el) => `<h2 class="bg-[#EDF7FF] p-3 rounded-md">${el}</h2>`
  );
  return htmlElements.join(" ");
};
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayUi(data.data));
};
const loadLabel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id} `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const lessonBtn = document.getElementById(`lesson-btn-${id}`);
      lessonBtn.classList.add("active");
      displayLabel(data.data);
    });
};
const loadDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  detailsUi(details.data);
};
const detailsUi = (datas) => {
  console.log(datas);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div>
              <h1 class="text-xl font-bold">
                ${datas.word} ( <i class="fa-solid fa-microphone-lines"></i> :${
    datas.pronunciation
  })
              </h1>
              <h3 class="mt-4 font-bold">Meaning</h3>
                <p>${datas.meaning}</p>
              <h3 class="mt-4 font-bold">Example</h3>
              <p>${datas.sentence}</p>
              <p class="mt-4 font-bangla">সমার্থক শব্দ গুলো</p>
              <div class="flex gap-3 mt-2">
                ${createElement(datas.synonyms)}
              </div>
            </div>
  `;
  document.getElementById("my_modal_5").showModal();
};
const displayLabel = (words) => {
  // get parent element
  const wordsParent = document.getElementById("words-label");
  wordsParent.innerHTML = "";
  if (words.length == 0) {
    wordsParent.innerHTML = `<div class="space-y-3 font-bangla">
          <img src="./assets/alert-error.png" alt="" class="mx-auto">
          <p class="text-center text-[#79716B]">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h1 class="text-3xl font-bold text-center">
            নেক্সট Lesson এ যান
          </h1>
        </div>`;
  }
  for (const word of words) {
    const vocab = document.createElement("div");
    vocab.innerHTML = ` 
     <div class=" p-10 bg-white rounded-md shadow-md w-full ">
          <h1 class="text-center text-xl font-bold">${
            word.word ? word.word : "Word not found"
          }</h1>
          <p class="text-center mt-2">Meaning / Pronounciation</p>
          <h1 class="text-center mt-2 text-[#18181B]">${
            word.meaning ? word.meaning : "Meaning not found"
          }/${
      word.pronunciation ? word.pronunciation : "Pronounciation not found"
    }</h1>
          <div class="flex justify-between mt-5 ">
            <button onclick="loadDetails(${
              word.id
            })" class="btn hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>`;
    wordsParent.append(vocab);
  }
};
const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lessonButton");
  lessonButton.forEach((btn) => btn.classList.remove("active"));
};
const displayUi = (lessons) => {
  const labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = "";
  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button id="lesson-btn-${lesson.level_no}" onclick="loadLabel(${lesson.level_no})" href="" class="btn btn-outline btn-primary px-9 lessonButton"
                ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button
              >`;
    labelContainer.append(btnDiv);
  }
};

loadLesson();
