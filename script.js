const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayUi(data.data));
};
const loadLabel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id} `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLabel(data.data));
};
const displayLabel = (words) => {
  // get parent element
  const wordsParent = document.getElementById("words-label");
  wordsParent.innerHTML = "";
  for (const word of words) {
    const vocab = document.createElement("div");
    vocab.innerHTML = ` 
     <div class=" p-10 bg-white rounded-md shadow-md w-full ">
          <h1 class="text-center text-xl font-bold">${word.word}</h1>
          <p class="text-center mt-2">Meaning /Pronounciation</p>
          <h1 class="text-center mt-2 text-[#18181B]">${word.meaning}</h1>
          <div class="flex justify-between mt-5 ">
            <button class="btn hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>`;
    wordsParent.append(vocab);
  }
};
const displayUi = (lessons) => {
  const labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = "";
  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadLabel(${lesson.level_no})" href="" class="btn btn-outline btn-primary px-9"
                ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button
              >`;
    labelContainer.append(btnDiv);
  }
};

loadLesson();
