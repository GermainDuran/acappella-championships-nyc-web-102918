document.addEventListener('DOMContentLoaded', () => {
console.log("Venezuela")

const groupsURL = `http://localhost:3000/a_cappella_groups/`
const tableBody= document.getElementById('table-body')
allData = []

fetch('http://localhost:3000/a_cappella_groups')
.then( res => res.json())
.then(data => {
  console.log(data)
  allData = data
  tableBody.innerHTML = ''
  data.forEach(cappella => {
    tableBody.innerHTML += `<tr class='table-row'>
                            <td>${cappella.college.name}</td>
                            <td>${cappella.name}</td>
                            <td>${cappella.membership}</td>
                            <td>${cappella.college.division}*</td>
                            <td><img src='./assets/trophy.png' data-id='${cappella.id}'/></td>
                            <td><button data-id='${cappella.id}'>✘</button></td>
                            </tr> `
// debo agregar un boton porque cuando seleccione el trofeo debe anadirlo al h2 diciendo que es el ganador winner
  })
})

// debo anadir un evento para cuando el trofeo este clicked

tableBody.addEventListener('click', (e) => {

  // debo usar un condicional para saber cuando lo que esta siendo clicked es sobre la imagen del trofeo
  if(e.target.tagName === 'IMG'){
      // debo saber que lo clicked para eso busco en mi data lo que tenga el mismo id
      let clickedGroup= allData.find(group => group.id == e.target.dataset.id)
      let filaGanadora = e.target.parentNode.parentNode
      let filas = document.querySelectorAll('.table-row')
      filas.forEach(fila => {
        fila.style.display = ''
      })
      filaGanadora.style.display = "none"
      // busco por header donde voy incluir la fila ganadora para que aparezca en el centro en el top
      const ganadorH2 = document.getElementById('winner')
        ganadorH2.innerText = `Winner: ${clickedGroup.name}`
  } // fin del if
  else if (e.target.tagName === 'BUTTON') {
      let clickedGroup= allData.find(group => group.id == e.target.dataset.id)
      deleteGroup(clickedGroup)
  }


})


const deleteGroup = (group) => {
   fetch((groupsURL + group.id), {
     method: 'DELETE'
   })
   .then(fetch('http://localhost:3000/a_cappella_groups')
   .then( res => res.json())
   .then(data => {
     console.log(data)
     allData = data
     tableBody.innerHTML = ''
     data.forEach(cappella => {
       tableBody.innerHTML += `<tr class='table-row'>
                               <td>${cappella.college.name}</td>
                               <td>${cappella.name}</td>
                               <td>${cappella.membership}</td>
                               <td>${cappella.college.division}*</td>
                               <td><img src='./assets/trophy.png' data-id='${cappella.id}'/></td>
                               <td><button data-id='${cappella.id}'>✘</button></td>
                               </tr> `
   // debo agregar un boton porque cuando seleccione el trofeo debe anadirlo al h2 diciendo que es el ganador winner
     })
   }))
 }


})// find del dom
