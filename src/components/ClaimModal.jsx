import React from "react";

export default function ClaimModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          borderRadius: 20,
          maxWidth: 480,
          margin: "60px auto",
          padding: 24,
          boxShadow: "0 4px 24px rgba(0,0,0,.14)",
          position: "relative",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "none",
            border: "none",
            fontSize: 26,
            cursor: "pointer",
            color: "#bbb",
          }}
          onClick={onClose}
        >
          ×
        </button>
        <h2 style={{ color: "#00a4e8", marginBottom: 20, textAlign: "center" }}>
          Formulario de Reclamos
        </h2>
        <form
          action="https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=00DHp000003SdlW"
          method="POST"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontFamily: "inherit"
          }}
        >
          <input type="hidden" name="orgid" value="00DHp000003SdlW" />
          <input type="hidden" name="retURL" value="http://" />

          <label>
            Nombre Completo:
            <input name="00NPg000005UPCr" maxLength="255" type="text" required className="claim-input" />
          </label>

          <label>
            Email:
            <input name="00NPg000005QQ4F" maxLength="80" type="email" required className="claim-input" />
          </label>

          <label>
            Nombre responsable reclamo:
            <input name="00NPg000005QQ4j" maxLength="255" type="text" className="claim-input" />
          </label>

          <label>
            RUT responsable reclamo:
            <input name="00NPg000005QQ4o" maxLength="255" type="text" className="claim-input" />
          </label>

          <label>
            Cliente (razón social):
            <input name="00NPg000005QQ49" maxLength="255" type="text" className="claim-input" />
          </label>

          <label>
            RUT cliente:
            <input name="00NPg000005QQ4n" maxLength="255" type="text" className="claim-input" />
          </label>

          <label>
            Asunto:
            <input name="subject" maxLength="80" type="text" className="claim-input" />
          </label>

          <label>
            Acción solicitada:
            <select name="00NPg000005QQ42" required className="claim-input">
              <option value="">--Seleccione--</option>
              <option value="Retiro">RETIRO</option>
              <option value="Retiro y Nota de credito">RETIRO Y NOTA DE CRÉDITO</option>
              <option value="Retiro y Facturacion">RETIRO Y FACTURACIÓN</option>
              <option value="Nota de credito y Facturacion">NOTA DE CRÉDITO Y FACTURACIÓN</option>
              <option value="Reposicion">REPOSICIÓN</option>
              <option value="Reposicion y Retiro">REPOSICIÓN Y RETIRO</option>
              <option value="Reposicion y Nota de credito">REPOSICIÓN Y NOTA DE CRÉDITO</option>
              <option value="Reposicion y Facturacion">REPOSICIÓN Y FACTURACIÓN</option>
              <option value="Facturacion">FACTURACIÓN</option>
              <option value="Nota de credito">NOTA DE CRÉDITO</option>
              <option value="Carta canje">CARTA CANJE</option>
              <option value="Canje">CANJE</option>
            </select>
          </label>

          <label>
            Factura:
            <input name="00NPg000005QQ4H" maxLength="255" type="text" className="claim-input" />
          </label>

          <label>
            Fecha factura:
            <input name="00NPg000005QQ4M" type="date" className="claim-input" />
          </label>

          <label>
            Guía de despacho:
            <input name="00NPg000005QQ4P" maxLength="255" type="text" className="claim-input" />
          </label>

          <label>
            Teléfono:
            <input name="00NPg000005QQ4q" maxLength="40" type="text" className="claim-input" />
          </label>

          <label>
            Motivo Reclamo:
            <select name="00NPg000005QQ4W" required className="claim-input">
              <option value="">--Seleccione--</option>
              <option value="NO SOLICITADO">NO SOLICITADO</option>
              <option value="FUERA DE PLAZO">FUERA DE PLAZO</option>
              <option value="DETERIORADO">DETERIORADO</option>
              <option value="FALLA DE CALIDAD">FALLA DE CALIDAD</option>
              <option value="FUERA DE TEMPERATURA (EXCURSIÓN)">FUERA DE TEMPERATURA (EXCURSIÓN)</option>
              <option value="ERROR EN DOCUMENTACIÓN">ERROR EN DOCUMENTACIÓN</option>
              <option value="FALTANTE POR VENTA SIN STOCK">FALTANTE POR VENTA SIN STOCK</option>
              <option value="FALTANTE">FALTANTE</option>
              <option value="RETIRO DE MERCADO">RETIRO DE MERCADO</option>
              <option value="SOBRANTES">SOBRANTES</option>
              <option value="OTROS CASOS">OTROS CASOS</option>
            </select>
          </label>

          <label>
            Detallar productos:
            <textarea name="00NPg00000AIpxZ" rows={2} className="claim-input" />
          </label>

          <label>
            Detallar reclamo:
            <textarea name="00NPg00000AIpxa" rows={2} className="claim-input" />
          </label>

          <label>
            Vendedor:
            <select name="00NPg000005QQ4w" required className="claim-input">
              <option value="">--Seleccione--</option>
              <option value="AILEEN MIÑO">AILEEN MIÑO</option>
              <option value="ALEJANDRO MENDEZ">ALEJANDRO MENDEZ</option>
              <option value="ANDREA RUIZ">ANDREA RUIZ</option>
              <option value="ANGELO OJEDA">ANGELO OJEDA</option>
              <option value="ANNE ASTORGA">ANNE ASTORGA</option>
              <option value="BERNABE SOLANO">BERNABE SOLANO</option>
              <option value="CARLA PUEBLA">CARLA PUEBLA</option>
              <option value="CAROLINA CHACON">CAROLINA CHACON</option>
              <option value="CAROLINA GOMEZ">CAROLINA GOMEZ</option>
              <option value="CAROL RAMIREZ">CAROL RAMIREZ</option>
              <option value="CESAR REYES">CESAR REYES</option>
              <option value="CORINA CRUZ">CORINA CRUZ</option>
              <option value="CRISTIAN DIAZ">CRISTIAN DIAZ</option>
              <option value="DANIELA ARANEDA">DANIELA ARANEDA</option>
              <option value="EDWARD AVALOS">EDWARD AVALOS</option>
              <option value="ESTEBAN ZENTENO">ESTEBAN ZENTENO</option>
              <option value="FABIOLA CORNEJO">FABIOLA CORNEJO</option>
              <option value="GENESIS MATAMALA">GENESIS MATAMALA</option>
              <option value="GUSTAVO FERNANDEZ">GUSTAVO FERNANDEZ</option>
              <option value="ILSE ARRIAGADA">ILSE ARRIAGADA</option>
              <option value="ISIDORA VALENZUELA">ISIDORA VALENZUELA</option>
              <option value="JONATAN TAPIA">JONATAN TAPIA</option>
              <option value="JOSE ANTONIO PASCUAL">JOSE ANTONIO PASCUAL</option>
              <option value="KARLA PEÑALVER VALLEE">KARLA PEÑALVER VALLEE</option>
              <option value="LEONARDO BARDI">LEONARDO BARDI</option>
              <option value="LEONARDO GONZALEZ PARRA">LEONARDO GONZALEZ PARRA</option>
              <option value="LEONARDO HERNANDEZ">LEONARDO HERNANDEZ</option>
              <option value="LUIS ROMAN">LUIS ROMAN</option>
              <option value="MARCELA MOLINA">MARCELA MOLINA</option>
              <option value="MARCELA PERINETTI">MARCELA PERINETTI</option>
              <option value="MARIA CORINA GARCIA">MARIA CORINA GARCIA</option>
              <option value="MARIA JOSE RAMIREZ">MARIA JOSE RAMIREZ</option>
              <option value="MARIA JOSE ROJAS">MARIA JOSE ROJAS</option>
              <option value="MARION ALARCON">MARION ALARCON</option>
              <option value="MARJORIE VEGA">MARJORIE VEGA</option>
              <option value="MARYURI QUINTERO">MARYURI QUINTERO</option>
              <option value="NESTOR NAVARRO">NESTOR NAVARRO</option>
              <option value="NICOLE LOBOS">NICOLE LOBOS</option>
              <option value="NINGUNO">NINGUNO</option>
              <option value="PAMELA ABAD">PAMELA ABAD</option>
              <option value="PAOLA ZAPATA">PAOLA ZAPATA</option>
              <option value="PAULINA BUSTAMANTE">PAULINA BUSTAMANTE</option>
              <option value="RODRIGO MIRANDA">RODRIGO MIRANDA</option>
              <option value="ROMY CARRASCO">ROMY CARRASCO</option>
              <option value="ROSA GUZMAN">ROSA GUZMAN</option>
              <option value="SANDRA LILLO">SANDRA LILLO</option>
              <option value="SILVIA FLORES">SILVIA FLORES</option>
              <option value="TANIA SANCHEZ">TANIA SANCHEZ</option>
              <option value="VIRGINIA GUZMAN">VIRGINIA GUZMAN</option>
            </select>
          </label>

          <button
            type="submit"
            style={{
              background: "#00a4e8",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              padding: "12px 0",
              borderRadius: 8,
              border: "none",
              marginTop: 8,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.09)"
            }}
          >
            Enviar Reclamo
          </button>
        </form>
      </div>
    </div>
  );
}
