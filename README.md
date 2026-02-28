## 3. Installationsanleitung Backend (API & Datenbank)

Diese Anleitung beschreibt die Einrichtung des Node.js-Backends und der PostgreSQL-Datenbank für den Global Travel Companion (GTC).

### 3.1 Voraussetzungen
Um das Backend lokal auszuführen, werden folgende Komponenten benötigt:
* **Node.js**: Zur Ausführung der serverseitigen JavaScript-Anwendung.
* **PostgreSQL**: Als relationale Datenbank für die Speicherung der Transaktionen und Benutzer.

### 3.2 Datenbank einrichten
1. Öffne pgAdmin oder dein bevorzugtes PostgreSQL-Tool und erstelle eine neue Datenbank namens `gtc`.
2. Führe das beiliegende SQL-Skript unter `resource/ddl.sql` in dieser neuen Datenbank aus.
3. Das Skript erstellt automatisch die vier benötigten Tabellen (`user`, `transaction`, `currency`, `country`) sowie die zugehörigen Fremdschlüssel und fügt erste Testdaten ein.

### 3.3 Umgebungsvariablen (.env) konfigurieren
Das Backend benötigt Umgebungsvariablen, um sich mit der Datenbank zu verbinden. Stelle sicher, dass im Hauptverzeichnis des Backends (eine Ebene über dem `src`-Ordner) eine `.env`-Datei mit folgendem Inhalt existiert:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gtc
DB_PORT=5432
PORT=3001