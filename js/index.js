let flag = false

const detect = async (e) => {
  try {
    const img = e.target
    console.log(img)
    //load model
    const model = await cocoSsd.load()
    //classify the image
    const predictions = await model.detect(img)
    console.log(predictions)
    for (let x = 0; x < predictions.length; x++) {
			const p = document.createElement('p');
			p.innerText =
				predictions[x].class +
				' - with ' +
				Math.round(parseFloat(predictions[x].score) * 100) +
				'% confidence.';
			p.style =
				'margin-left: ' +
				predictions[x].bbox[0] +
				'px; margin-top: ' +
				(predictions[x].bbox[1] - 10) +
				'px; width: ' +
				(predictions[x].bbox[2] - 10) +
				'px; top: 0; left: 0;';

			const innerSquare = document.createElement('div');
			innerSquare.setAttribute('class', 'innerSquare');
			innerSquare.style =
				'left: ' +
				predictions[x].bbox[0] +
				'px; top: ' +
				predictions[x].bbox[1] +
				'px; width: ' +
				predictions[x].bbox[2] +
				'px; height: ' +
				predictions[x].bbox[3] +
				'px;';

			e.target.parentNode.appendChild(innerSquare);
			e.target.parentNode.appendChild(p);
		}
  } catch (err) {
    console.log(err)
  }
}

const handleClick = _ => {
  //console.log(e.target)
  const images = document.querySelectorAll('#wrapper-images > div > .card > img') 
  console.log(images)

  if(images.length){
    console.log(images)
    for(let el of images) {
      el.addEventListener('click', detect)
    }
  }
  //detect(e)

}

const handleChange = (e) => {
  
  const images = e.target.files

  const wrapper = document.querySelector('#wrapper-images')
  wrapper.innerHTML = ''
  
  for(let el of images){
    const col = document.createElement('div')
    const card = document.createElement('div')
    const img = document.createElement('img')
    col.setAttribute('class', 'col-sm-6 col-md-4 col-lg-4 my-3')
    card.setAttribute('class', 'rounded-2 shadow card')
    img.setAttribute('class', 'img-fluid rounded-2')
    img.setAttribute('crossorigin', 'anonymous')
    img.setAttribute('src', URL.createObjectURL(el))
    card.appendChild(img)
    col.appendChild(card)
    wrapper.appendChild(col)
  }

  const msnry = new Masonry(wrapper, {
    resize: true,
    percentPosition: true
  })

  imagesLoaded(wrapper).on('progress', () => {
    msnry.layout()
  })

  handleClick()
}


window.addEventListener('load', (e) => {
  const file = document.querySelector('#image-upload')
  file.addEventListener('change', handleChange)
  handleClick()
  //image.addEventListener('click', handleClick)
})


