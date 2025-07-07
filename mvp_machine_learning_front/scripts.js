const digits_1_to_10 = (elem) => {
  elem.value = elem.value.replace(/\D/g, "");
  if(elem.value == '')      return
  else if(elem.value > 10)  elem.value  = 10
  else if(elem.value == 0)  elem.value  = 1
}

const consultar = () => {
  form = document.getElementById("formulario")

  // Checar se tem algum campo vazio
  form_input_names = ['Clump_thickness',
    "Uniformity_of_cell_size",
    "Uniformity_of_cell_shape",
    "Marginal_adhesion",
    "Single_epithelial_cell_size",
    "Bare_nuclei",
    "Bland_chromatin",
    "Normal_nucleoli",
    "Mitoses"
  ]

  inputs_values = []
  for (input_name of form_input_names){
    document.getElementById(input_name).value = 1
    value = document.getElementById(input_name).value
    inputs_values.push(value)
    if(value == ''){
      alert("Todos os campos devem ser preenchidos")
      return
    }
  }
  const formData = new FormData();
  formData.append('Clump_thickness', inputs_values[0]);
  formData.append('Uniformity_of_cell_size', inputs_values[1]);
  formData.append('Uniformity_of_cell_shape', inputs_values[2]);
  formData.append('Marginal_adhesion', inputs_values[3]);
  formData.append('Single_epithelial_cell_size', inputs_values[4]);
  formData.append('Bare_nuclei', inputs_values[5]);
  formData.append('Bland_chromatin', inputs_values[6]);
  formData.append('Normal_nucleoli', inputs_values[7]);
  formData.append('Mitoses', inputs_values[8]);

  let url = 'http://127.0.0.1:5000/consulta';
  diagnostico = ''
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      diagnostico = data; // Retorna os dados do paciente com o diagnóstico
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });

  resultado = ''
  if(diagnostico = 0) resultado = "Parabéns, boas chances de você não ter cancer de mama."
  else resultado = "Infelizmente você possui um risco elevado, seria prudente consultar um médico."

  alert(resultado)
}

