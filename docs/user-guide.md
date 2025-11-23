# RaceLine AI Coach — User Guide

This guide walks through running the platform locally, uploading new circuits, and exploring every UI view. For architectural details, see [`docs/project-overview.md`](project-overview.md).

## 1. Run the Platform Locally

1. **Start the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
   The server scans `/data/**`, converts CSVs to Parquet, and exposes REST endpoints at `http://localhost:8000`.

2. **Start the frontend**
   ```bash
   cd frontend
   python -m http.server 3000
   ```
   Open http://localhost:3000. The UI automatically calls the backend API running on port 8000.

3. **(Optional) Enable AI coach**
   ```bash
   export GEMINI_API_KEY=your_key
   export GEMINI_MODEL=gemini-2.5-pro
   ```

## 2. Add a New Circuit

1. Extract the raw files (telemetry, lap start/end/time, weather, results, etc.) into `data/<Circuit Name>/`.
2. Restart the backend so it converts the CSVs to Parquet. The circuit appears automatically in the “Select Circuit” dropdown.
3. All races found in filenames (e.g., `R1`, `R2`) are exposed without manual configuration.

## 3. Walkthrough of the Interface

### 3.1 Landing & Selections

| Screen | Description |
| --- | --- |
| ![Vehicle selection](medias/select-vehicle-ui.png) | Select a circuit, then browse vehicles in paginated tiles (🟦 indicates active selection) |
| ![Lap selection](medias/select-lap-ui.png) | Choose the lap you want to analyze; delta vs golden lap is displayed on each card |

### 3.2 Track Insight Maps

| Tab | Visual |
| --- | --- |
| Lap comparison (default) | ![Lap comparison map](medias/lap-comparizon-map.png) — ghost markers animate along the circuit, highlighting improvement segments |
| Consistency heatmap | ![Consistency map](medias/consistency-heatmap.png) — segments colored by variance, hover for tooltips |
| Flow dynamics | ![Flow map](medias/flow-dynamics-map.png) — shows momentum along the lap with detailed tooltips |
| Ghost laps | ![Ghost map](medias/ghost-lap-map.png) — overlay alternate laps for deeper comparisons |

Hold the mouse over a highlighted segment to read detailed instructions; right above the map, the legend explains every color.

### 3.3 Coaching Tabs

| Tab | Visual |
| --- | --- |
| 🎯 Top 3 Areas to Improve | ![Top 3](medias/top-3-area-to-improve.png) — rule-based recommendations on distance, throttle, brake |
| 🤖 AI Coach Insights | ![AI coach](medias/ai-coach-insights.png) — Gemini summary + tips. Requires `GEMINI_API_KEY`. |
| 🌤️ Weather | Refer to the panel screenshot to see aggregated track/air data drawn from the CSV weather logs. |

### 3.4 Analytics Charts

| Chart | Visual |
| --- | --- |
| Speed trace | ![Speed trace](medias/speed-trace-graph.png) |
| Lap progression | ![Progression](medias/lap-progression-graph.png) |
| Hot-zone variance | ![Hot-zone variance](medias/hot-zone-variance-graph.png) |
| Race timeline | ![Timeline](medias/race-timeline-graph.png) |

Each chart tab shows informative empty states when data is missing (e.g., insufficient laps). Hover to see raw values.

## 4. Workflow Tips

- **Resetting the view**: Use the “Reset view” button above the maps to re-center/zoom.
- **Lap replay**: Press “Play Lap Replay” to animate the comparison markers; hit the same button again to pause.
- **Ghost laps**: Toggle to the “Ghost laps” tab and select which historical laps to overlay.
- **Consistency insights**: The Consistency Analyzer tab explains whether deviations are “Excellent”, “Balanced”, or “Weak” with emoji-coded rows.

## 5. Sharing & Hosting

- Deploy the frontend via `firebase deploy --only hosting`.
- Containerize the backend (Dockerfile in `backend/`) and deploy to Cloud Run with the `data/` folder included.
- Provide stakeholders with the GIF (`medias/lap-comparizon-map-gif.gif`) or video (`medias/lap-comparizon-map-video.mp4`) for demos.

---

Need more detail on the architecture or data pipeline? See [`docs/project-overview.md`](project-overview.md).
