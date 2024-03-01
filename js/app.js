const btnContainer = document.getElementById('btn-container');
const cardcontainer = document.getElementById('card-container');
const errorel = document.getElementById('error-element');
const sortbtn = document.getElementById('sort-btn');
let selectedcategory = 1000;
let sortedview = false;
sortbtn.addEventListener('click', () => {
    sortedview = true;
    fetchdatabycategories(selectedcategory, sortedview);
})
const fetchcategories = () => {
    const url = 'https://openapi.programming-hero.com/api/videos/categories'
    fetch(url)
        .then((res) => res.json())
        .then(({ data }) => {
            data.forEach((card) => {
                console.log(card);
                const newbtn = document.createElement('button');
                newbtn.className = 'category-btn btn bg-slate-400'
                newbtn.innerText = card.category;
                newbtn.addEventListener('click', () => {
                    fetchdatabycategories(card.category_id)


                    const allbtns = document.querySelectorAll('.category-btn');
                    for (const btn of allbtns) {
                        btn.classList.remove('bg-red-400')
                    }
                    newbtn.classList.add('bg-red-400')

                })


                btnContainer.appendChild(newbtn);

            })
        })
}
const fetchdatabycategories = (category, sortedview) => {
    selectedcategory = category;
    const url = `https://openapi.programming-hero.com/api/videos/category/${category}`
    fetch(url)
        .then((res) => res.json())
        .then(({ data }) => {
            if (sortedview) {
                data.sort((a, b) => {
                    const first = a.others.views
                    const second = b.others.views
                    const totalviewsfirnumber = parseFloat(first.replace("k", '')) || 0;
                    const totalviewssecondnumber = parseFloat(second.replace("k", '')) || 0;
                    return totalviewsfirnumber - totalviewssecondnumber;

                })
            }
            if (data.length === 0) {
                errorel.classList.remove('hidden');
            } else {
                errorel.classList.add('hidden');

            }
            cardcontainer.innerHTML = ''
            data.forEach((video) => {


                let verifiedbadge = ''

                if (video.authors[0].verified) {
                    verifiedbadge = `<img class="w-6 h-6" src="Verified-badge.png" alt="">`
                }

                const newv = document.createElement('div');

                newv.innerHTML = `<div class="card w-96  bg-base-100 shadow-xl">
                <figure><img src="${video.thumbnail}" alt="Shoes" />
                    <h6></h6>
                </figure>
                <div class="card-body">
                <div class="flex space-x-3">
                    <div>
                        <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                    </div>
                    <div>
                        <h3>${video.title}</h3>
                        <div class="flex mt-3 space-x-3">
                        
                            <p>${video.authors[0].profile_name}</p>
                            ${verifiedbadge}
                            
                            
                            
                        </div>
                        <p>${video.others.views}</p>
    
                    </div>
                </div>
            </div>

                `
                cardcontainer.appendChild(newv)
            })



        })

}
fetchcategories()
fetchdatabycategories(selectedcategory, sortedview);