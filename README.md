# 📱 Mobile Zeiterfassung – React Native App (Mockup)

Diese App ist ein technisches Mockup für eine mobile Zeiterfassung, erstellt mit **React Native** und kann für den späteren Einsatz in einer produktionsreifen Umgebung erweitert werden.

> 🎯 Ziel: Demonstration einer funktionalen App mit Start/Stopp-Zeiterfassung, Aktivitätenauswahl und lokaler Datenspeicherung – als Basis für spätere Integration in bestehende Systeme.

---

## Pflichtfunktionen

### 🏷 Aktivitäten-Auswahl

- Vordefinierte Liste von Aktivitäten:
  - `Arbeit mit Klient`
  - `Interne Planung`
  - `Teammeeting`
  - `Fortbildung`
- Auswahl erfolgt über ein benutzerfreundliches **Dropdown-Menü**

### ⏱ Start-/Stopp-Zeiterfassung

- **Start-Button**: Beginnt die Zeiterfassung nach Auswahl einer Aktivität
- **Stopp-Button**: Beendet die Zeiterfassung und speichert den Eintrag lokal
- Manuelle Eingabe von **Start- und Endzeit** ist ebenfalls möglich (z. B. bei nachträglicher Erfassung)

### 💾 Lokale Speicherung

- Persistente Speicherung der Einträge via `AsyncStorage`
- Änderungen wirken sich **direkt** auf die Anzeige aus
- Kein Backend erforderlich – alles funktioniert offline

---

## 🛠 Tech Stack

- [React Native](https://reactnative.dev/) um eine plattformübergreifende App (Android/IOS) zu erstellen.
- [Expo](https://expo.dev/) für schnelles Testing & Deployment
- [React Native Paper](https://callstack.github.io/react-native-paper/) – UI-Bibliothek basierend auf Material Design
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – lokale Persistenz
- [date-fns](https://date-fns.org/) – für Datum/Zeit-Formatierung
- [react-native-modal-datetime-picker](https://www.npmjs.com/package/react-native-modal-datetime-picker) – komfortable Auswahl von Zeiten/Zeitpunkten

---

## 🚀 Get Started

### 1. Voraussetzungen

Bevor man die App testen kann, müssen folgende Tools installiert sein:

- **[Node.js](https://nodejs.org/)** (empfohlen: LTS-Version)
- **npm** (wird mit Node installiert)
- **Expo Go App** für dein Smartphone:  
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)  
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)

> Mithilfe von Expo Go kann man das Projekt direkt auf dem Handy testen – ohne Emulator!

#### Optional: Emulator/Simulator (nur bei Bedarf)

- Android: [Android Studio installieren](https://developer.android.com/studio) → Emulator einrichten  
- iOS (nur macOS): [Xcode installieren](https://developer.apple.com/xcode/) → iOS Simulator nutzen

---

### 2. Projekt starten

1. Repository klonen:

   ```bash
   git clone <repo-url>
   cd <projektordner>
   ```

2. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

3. Projekt starten:

   ```bash
   npm install
   ```

---

## 🔐 Sicherheit & zukünftige Systemintegration (Konzept)

In einer produktionsreifen Umgebung spielen verschiedene Themen eine zentrale Rolle – derzeit **nicht umgesetzt**, aber konzeptionell vorbereitet:

- **Authentifizierung**  
  Eine Umsetzung eines Login-Systems z. B. per OAuth2 / JWT mit rollenbasiertem Berechtigungssystem für unterschiedliche Nutzergruppen.

- **Sichere Datenübertragung**  
  Künftige Kommunikation mit einem Backend erfolgt ausschließlich über HTTPS. Sensible Nutzerdaten werden **nicht im Klartext gespeichert** (z. B. Token-Verschlüsselung, Hashing von Zugangsinformationen).

- **Lokale Datenspeicherung**  
  Aktuell werden Einträge lokal über `AsyncStorage` verwaltet – für spätere Sicherheitserweiterungen kann dies durch `EncryptedStorage` oder `SecureStore` ersetzt werden (z. B. für Login-Tokens oder personenbezogene Daten).

- **API & Datenbank-Anbindung**  
  Die App ist vorbereitet für REST- oder GraphQL-APIs zur Synchronisation mit einer zentralen Datenbank.

- **DSGVO-Konformität & Architektur**  
  Architektur mit Fokus auf Datentrennung (z. B. zwischen Nutzer- und Aktivitätsdaten), lokale Speicherung ohne personenbezogene Identifizierungsmerkmale der Aktivitäten.

> 💡 Die App verfolgt derzeit ein *Offline-First*-Konzept, ist aber technisch vorbereitet für spätere Cloud- oder Serverintegration mit sicherem Datentransport und Benutzerverwaltung.

---

## ⚠️ Hinweis zur Nutzung / Urheberrecht

Diese App wurde im Rahmen eines Lern- und Demonstrationszwecken erstellt.  
Sie dient ausschließlich der Veranschaulichung technischer Fähigkeiten und ist **nicht für den produktiven Einsatz vorgesehen**.

> Jegliche kommerzielle Nutzung, Weiterverbreitung oder produktive Integration dieser Software (ganz oder in Teilen) ohne meine ausdrückliche Zustimmung ist **nicht gestattet**.

© manamasu – Alle Rechte vorbehalten.
