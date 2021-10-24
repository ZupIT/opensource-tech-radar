(() => {
  const cpRingsDataItems = document.querySelectorAll('.cp-rings-circles-item-data');

  if (cpRingsDataItems) {
    const cpRingsBoxes = document.getElementById('cp-rings-boxes')
    const cpRingsCircles = document.getElementById('cp-rings-circles')
    const cpRingsCard = document.getElementById('cp-rings-card')

    const rings = [];
    
    cpRingsDataItems.forEach((item) => {
      const { title, image, caption } = item.dataset;

      rings.push({
        title,
        image,
        caption
      });
    })
  
    // boot
    if (cpRingsBoxes && cpRingsCircles && cpRingsCard && rings) {
      renderRings()
  
      function renderRings () {
        rings.forEach((ring, i) => {
          const index = i + 1
          createRingElement(ring, index)
          createSquareElement(ring, index)
          if (index === 1) {
            selectRing(index)
          }
        })
      }
  
      function createRingElement (ring, i) {
        const divRing = document.createElement('div')
        divRing.className =
          i == 1 ? 'cp-rings-boxes-item is-active' : 'cp-rings-boxes-item'
        divRing.innerText = ring.title
        divRing.onclick = () => selectRing(i)
        cpRingsBoxes.append(divRing)
      }
  
      function createSquareElement (ring, i) {
        const divSquare = document.createElement('div')
        divSquare.className =
          i == 1 ? 'cp-rings-circles-item is-active' : 'cp-rings-circles-item'
  
        const indexes = rings.map((_v, i) => i + 1)
        const index = indexes.indexOf(i) + 1
        const zIndex = indexes.reverse().indexOf(i) + 1
        divSquare.style = '--index:' + index + ';z-index:' + zIndex
        divSquare.onclick = () => selectRing(i)
        cpRingsCircles.append(divSquare)
      }
  
      function selectRing (index) {
        const ring = rings[index - 1]
        displaySelectedRing(ring, index)
      }
  
      function displaySelectedRing (ring, index = 1) {
        cpRingsCard.innerHTML = ''
  
        const thumbnail = document.createElement('div')
        const content = document.createElement('div')
  
        thumbnail.className = 'cp-rings-card-thumbnail'
        content.className = 'cp-rings-card-content'
  
        const img = document.createElement('img')
        const title = document.createElement('h3')
        const caption = document.createElement('p')
  
        img.src = ring.image
        title.innerText = ring.title
        caption.innerText = ring.caption
  
        thumbnail.append(img)
        content.append(title, caption)
  
        cpRingsCard.append(thumbnail, content)
  
        Array.from(cpRingsBoxes.children).forEach((element, indexElement) => {
          verifyClassActive(element, indexElement)
        })
  
        Array.from(cpRingsCircles.children).forEach((element, indexElement) => {
          verifyClassActive(element, indexElement)
        })
  
        function verifyClassActive (element, indexElement) {
          if (index === indexElement + 1) {
            element.classList.add('is-active')
          } else {
            element.classList.remove('is-active')
          }
        }
      }
    }
  }
})();