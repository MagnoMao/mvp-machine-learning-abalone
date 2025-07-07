from flask import Flask
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)


@app.route("/")
@app.post("/consulta")
def consulta(form):
    """Realiza a predição de um paciente com base no modelo treinado
    """
    path = '../machine_learning/data/knn_cancer_mama.pkl'
    file = open(path, 'rb')
    model = pickle.load(file)

    X_input = np.array([form.Clump_thickness,
                        form.Uniformity_of_cell_size,
                        form.Uniformity_of_cell_shape,
                        form.Marginal_adhesion,
                        form.Single_epithelial_cell_size,
                        form.Bare_nuclei,
                        form.Bland_chromatin,
                        form.Normal_nucleoli,
                        form.Mitoses,
                        ])

    diagnosis = model.predict(X_input)[0]
    return diagnosis
