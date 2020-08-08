import React from "react";

import { WhatsappIcon } from "../../assets/images";

import "./styles.css";

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/14305552?s=460&u=c4895d72fe4f24cb6f829c2f48ba57f11a1c5c28&v=4"
          alt="Lucas Bicalho"
        />
        <div>
          <strong>Lucas Bicalho</strong>
          <span>Matemática</span>
        </div>
      </header>

      <p>Descrição super criativa que ainda não pensei.</p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={WhatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
