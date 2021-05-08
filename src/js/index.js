let cep = document.getElementById("cep");
let email = document.getElementById("email");

const showData = (result) => {
    for (const campo in result) {
        if (document.querySelector("#" + campo)) {
            document.querySelector("#" + campo).value = result[campo];
        }
    }
};

cep.addEventListener("blur", (e) => {
    let search = cep.value.replace("-", "");
    const options = {
        method: "GET",
        mode: "cors",
        cache: "default",
    };

    fetch(`https://viacep.com.br/ws/${search}/json/`)
        .then((response) => {
            response.json().then((data) => {
                showData(data);
            });
        })
        .catch((e) => console.log("Deu erro:" + e, message));
});

email.addEventListener("blur", () => {
    if (email.value.match("@")) {
    } else {
        alert("Insira um email válido");
    }
});

lsCadastro = [
    { id: "", nome: "", email: "", cpf: "", tel: "", cep: "", logradouro: "" },
];

if (localStorage.getItem("listaCadastro") == null) {
    localStorage.setItem("listaCadastro", JSON.stringify(lsCadastro));
}

lsCadastro = JSON.parse(localStorage.getItem("listaCadastro"));

function loadTable() {
    tbody = "";
    for (i in lsCadastro) {
        p = lsCadastro[i];
        tbody += `<tr onclick='editar(${i})'> <td>${Number(i) + 1}</td> <td>${
            p.nome
        }</td> <td>${p.email}</td> <td>${p.cpf}</td> <td>${p.tel}</td> <td>${
            p.cep
        }</td><td><span onclick="mover(${i},-1)">&#8679;</span><span onclick="mover(${i},1)">&#8681;</span></td></tr>`;
    }
    document.getElementById("tb-body").innerHTML = tbody;
    localStorage.setItem("listaCadastro", JSON.stringify(lsCadastro));
}

function novo() {
    document.getElementById("form").reset();
    document.getElementById("index").value = "";
    document.getElementById("form").style.display = "fixed";
}

function gravar() {
    id = document.getElementById("index").value;

    p = { qt: 0 };
    p.nome = document.getElementById("nome").value;
    p.email = document.getElementById("email").value;
    p.cpf = document.getElementById("cpf").value;
    p.tel = document.getElementById("tel").value;
    p.cep = document.getElementById("cep").value;
    p.logradouro = document.getElementById("logradouro").value;
    p.bairro = document.getElementById("bairro").value;
    p.localidade = document.getElementById("localidade").value;
    p.uf = document.getElementById("uf").value;

    if (id != "") {
        lsCadastro[id] = p;
    } else {
        lsCadastro.push(p);
    }
    loadTable();
    novo();
}

function editar(id) {
    p = lsCadastro[id];

    document.getElementById("index").value = id;
    document.getElementById("nome").value = p.nome;
    document.getElementById("email").value = p.email;
    document.getElementById("cpf").value = p.cpf;
    document.getElementById("tel").value = p.tel;
    document.getElementById("cep").value = p.cep;
    document.getElementById("logradouro").value = p.logradouro;
}

function apagar() {
    id = document.getElementById("index").value;

    if (id == "") {
        return;
    }

    if (confirm("Você realmente deseja excluir esse registro?")) {
        lsCadastro.splice(id, 1);
        loadTable();
        novo();
    }
}

function mover(i, mov) {
    if (lsCadastro[i + mov] == undefined) {
        return;
    }

    aux = lsCadastro[i];
    lsCadastro[i] = lsCadastro[i + mov];
    lsCadastro[i + mov] = aux;

    loadTable();
}

loadTable();
