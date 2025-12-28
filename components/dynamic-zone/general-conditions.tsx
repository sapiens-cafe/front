import React from 'react';

// Définition du type pour le composant (optionnel car c'est une page simple)
export function GeneralConditions({ title }: { title?: string }) {
  return (
    // Ce style est juste un exemple pour centrer le contenu,
    // utilisez votre Layout ou vos classes de style habituelles
    <div style={{ padding: '40px', maxWidth: '800px', margin: '40px auto 0 auto' }}>
      <h1>POLITIQUE DE CONFIDENTIALITÉ</h1>

      {/* ⚠️ Remplissez les crochets [] avec les informations de votre client ⚠️ */}

      {/* SECTION 1 */}
      <h2>1. Responsable du Traitement des Données</h2>
      <p>Le responsable du traitement de vos données personnelles est :</p>
      <ul>
        <li>
          <strong>Nom :</strong> Sapiens café
        </li>
        <li>
          <strong>Adresse Email :</strong> info@sapienscafe.fr
        </li>
      </ul>

      {/* SECTION 2 */}
      <h2>2. Données Collectées et Finalité</h2>
      <p>
        {"Nous collectons uniquement votre adresse email via le formulaire d'inscription à notre"}
        newsletter.{' '}
      </p>
      <p>
        <strong>Finalité :</strong> {"L'envoi de notre newsletter promotionnelle et informative."}
      </p>
      <p>
        <strong>Base Légale :</strong> {'Votre consentement (Article 6.1.a du RGPD).'}
      </p>

      {/* SECTION 3 */}
      <h2>3. Durée de Conservation des Données</h2>
      <p>
        {
          "Votre adresse email est conservée tant que vous ne vous désinscrivez pas. L'adresse sera supprimée suite à une demande de désinscription ou après une période d'inactivité de 3 ans."
        }
      </p>

      {/* SECTION 4 */}
      <h2>4. Destinataires des Données</h2>
      <p>
        Vos données sont traitées uniquement par les services internes de Sapiens café et ne sont
        pas transférées à des tiers.
      </p>

      {/* SECTION 5 */}
      <h2>5. Vos Droits (Droits du RGPD)</h2>
      <p>
        {
          "Vous disposez des droits d'accès, de rectification, d'opposition, à l'effacement, et à la portabilité. Pour exercer ces droits, veuillez nous contacter par email à : info@sapienscafe.fr"
        }
      </p>

      {/* SECTION 6 */}
      <h2>{"6. Droit d'introduire une plainte"}</h2>
      <p>
        {
          "Vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente (la CNIL en France)."
        }
      </p>
    </div>
  );
}
