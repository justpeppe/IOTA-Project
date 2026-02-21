# TrustPass — MVP: Digital Identity Notarization for Travel Check-in
*Documento di Progettazione e Piano di Implementazione*

---

## 1. Panoramica del Progetto (Executive Summary)

**Il Problema:**
Attualmente, i viaggiatori (specialmente per strutture extra-alberghiere come B&B o case vacanza) sono spesso costretti a inviare foto dei propri documenti d'identità (carta d'identità, passaporto) a host sconosciuti tramite canali non sicuri (WhatsApp, email). Questo espone i viaggiatori a gravi rischi di furto d'identità, in quanto non hanno alcun controllo su dove finiscano e come vengano archiviati quei file.

**La Soluzione: TrustPass**
TrustPass è una Web App DApp (Decentralized Application) che permette ai viaggiatori di **notarizzare i propri documenti d'identità sulla blockchain di IOTA** e di condividere con gli host solo delle **prove crittografiche verificabili**, eliminando la necessità di inviare i file grezzi. 

Il sistema si basa su hash crittografici (SHA-256) generati localmente sul dispositivo dell'utente, garantendo che i dati sensibili non lascino mai lo smartphone del viaggiatore, nel pieno rispetto della privacy by design e del GDPR.

---

## 2. Principi Cardine e Design

*   **Privacy by Design:** Il documento originale non tocca mai i server di TrustPass. Tutto avviene client-side.
*   **Zero-Knowledge PII:** Nessun dato personale (PII) viene archiviato nei nostri database.
*   **Mobile-First:** L'esperienza utente è ottimizzata per smartphone, il dispositivo principale utilizzato in viaggio.
*   **Trasparenza UX:** L'interfaccia fornirà feedback chiari in ogni fase "critica" (Generazione Hash ✅, Notarizzazione in corso ⏳, Conferma su Blockchain ✅).

---

## 3. Ruoli nel Sistema

### A. Il Viaggiatore (Prover)
Il proprietario del documento. Tramite l'app:
1.  Scansiona o carica il documento d'identità.
2.  Genera l'Hash SHA-256 sul proprio dispositivo in modo locale.
3.  Registra l'Hash sulla blockchain IOTA, ottenendo in cambio un `Object ID` univoco (la ricevuta di notarizzazione).
4.  Genera un QR Code contenente questo `Object ID` da mostrare all'host.

### B. Il Capogruppo (Bundle Creator) - *Fase 2*
Utile per le famiglie o i gruppi di amici.
1.  Crea un oggetto IOTA dinamico ("Travel Bundle").
2.  Raccoglie gli `Object ID` (solo le ricevute, non i documenti) degli altri membri del gruppo.
3.  Genera un unico QR Code cumulativo per snellire il check-in.

### C. L'Host (Verifier)
L'operatore della struttura ricettiva.
1.  Scansiona il QR Code del Viaggiatore o del Capogruppo.
2.  L'app interroga la blockchain IOTA e verifica istantaneamente che la notarizzazione sia valida e i dati non siano stati manomessi.
3.  *Opzionale:* Se gli estremi completi del documento sono legalmente necessari, può richiedere un link crittografato temporaneo (scadenza 24h) per accedere ai dati.

---

## 4. Architettura Tecnica e Tech Stack

Il progetto è strutturato come un mono-repo diviso in tre componenti principali.

### 4.1. Blockchain & Smart Contracts (IOTA Move)
*   **Network:** IOTA Testnet (per l'MVP), transizione a Mainnet post-validazione.
*   **Linguaggio:** Move.
*   **Pacchetto Base:** Utilizzo del pacchetto ufficiale `iota-notarization` di IOTA.
*   **Strategia:**
    *   *Documento Singolo (Locked Notarization):* Hash salvato on-chain in modo immutabile. Record permanente non trasferibile, legato al wallet dell'utente.
    *   *Gruppi (Dynamic Notarization - TrustPass Bundle Module):* Oggetto mutabile di proprietà del Capogruppo, a cui si possono aggiungere/rimuovere gli ID dei membri.

### 4.2. Frontend (React dApp)
*   **Framework:** Vite, React, TypeScript, Tailwind CSS (per un'interfaccia pulita e moderna).
*   **Integrazione Web3:** `@iota/dapp-kit` e `@iota/iota-sdk` per la connessione del wallet e la firma delle transazioni (PTB).
*   **Hashing Locale:** Web Crypto API nativa dei browser per generare l'SHA-256 senza inviare dati al server.
*   **Librerie Extra:** `qrcode.react` (generazione QR) e `html5-qrcode` / `@zxing/browser` (scansione QR).

### 4.3. Backend (Node.js REST API)
*Il backend funge principalmente da utility layer e proxy di lettura.*
*   **Framework:** Express, Node.js, TypeScript.
*   **Funzionalità MVP:** Supporto alle query verso l'IOTA SDK per la verifica server-side.
*   **Logica Dati Temporanei (TTL 24h):** Gestione in RAM (o Redis) dei link crittografati per il trasferimento temporaneo dei dati, se richiesto dall'host, garantendo l'eliminazione automatica dopo 24 ore.

---

## 5. Endpoints API Pianificati

*   `POST /hash`: Helper mock (l'hashing reale avviene client-side, endpoint utile per test).
*   `POST /notarize/locked`: Wrapper per la creazione di notarizzazioni bloccate su IOTA.
*   `POST /notarize/dynamic`: Wrapper per la creazione del bundle dinamico.
*   `POST /bundle/add`: Aggiunta di un membro a un bundle dinamico.
*   `GET /verify/:objectId`: Interroga la blockchain e restituisce l'esito della verifica.
*   `POST /templink`: Generazione del link crittografato a tempo (24h TTL) per l'accesso raw.
*   `GET /health`: Verifica dello stato del sistema.

---

## 6. Pagine della Web App (UI Flow)

1.  **Home:** Landing page esplicativa sul problema, con chiara Call-to-Action "Proteggi la tua identità".
2.  **Notarize (Viaggiatore):** Flusso di Upload Documento → Generazione Hash Locale → Firma Transazione IOTA → Schermata di Successo con QR Code.
3.  **Verify (Host):** Fotocamera attiva / Input per incollare l'Object ID → Risultato verifica blockchain (Match Hash ✅, Timestamp, Indirizzo Wallet Proprietario).
4.  **Group:** Interfaccia per il Capogruppo per creare il Bundle, raccogliere ID e mostrare il QR cumulativo.
5.  **About:** Pagina descrittiva sulla tecnologia TrustPass e i vantaggi per la privacy.

---

## 7. Piano di Sviluppo e Task (Implementation Plan)

Il lavoro è strutturato in 5 fasi.

### Fase 1: Planning e Setup (In corso)
*   [x] Definizione dell'architettura e delle tecnologie.
*   [x] Definizione dei modelli di dati Move.
*   [x] Stesura di questo documento da presentare.

### Fase 2: Smart Contracts (IOTA Move)
*   [ ] Inizializzazione progetto Move.
*   [ ] Integrazione pacchetto ufficiale `iota-notarization`.
*   [ ] Creazione modulo custom `trustpass::bundle` per la gestione dei gruppi.
*   [ ] Scrittura unit test Move e deployment su IOTA Testnet.

### Fase 3: Backend Node.js
*   [ ] Setup ambiente Express + TypeScript.
*   [ ] Integrazione `@iota/iota-sdk` per le query.
*   [ ] Implementazione degli endpoint REST e della logica del link temporaneo a 24h (`/templink`).

### Fase 4: Frontend dApp
*   [ ] Setup progetto React con Tailwind e connessione wallet (`@iota/dapp-kit`).
*   [ ] Creazione del modulo di hashing SHA-256 client-side (Web Crypto API).
*   [ ] Creazione delle pagine viste e flussi UI.
*   [ ] Integrazione generatore e scanner QR Code.

### Fase 5: Verifica End-to-End
*   [ ] Test del flusso singolo: Caricamento → Hash → Notarizzazione → QR → Scansione → Verifica Positiva.
*   [ ] Test di sicurezza (Network tab) per garantire che i documenti grezzi non vengano mai inviati al server.
*   [ ] Preparazione README, diagrammi e linee guida per il deploy finale.
