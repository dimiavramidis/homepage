function getVideoTrackingContext() {
  const params = new URLSearchParams(window.location.search);
  const recipientToken = params.get("t") || params.get("token") || "";
  const visitorIdKey = "aionio-video-visitor-id";
  let visitorId = window.localStorage.getItem(visitorIdKey);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    window.localStorage.setItem(visitorIdKey, visitorId);
  }

  return {
    recipientToken,
    visitorId,
    pageUrl: window.location.href,
    referrer: document.referrer || "",
  };
}

function sendVideoTrackingEvent(eventType, details = {}) {
  const endpoint =
    window.AIONIO_VIDEO_TRACKING_ENDPOINT || "/api/video-tracking";
  const payload = {
    eventType,
    ...getVideoTrackingContext(),
    timestamp: new Date().toISOString(),
    ...details,
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    const queued = navigator.sendBeacon(endpoint, blob);

    if (queued) {
      return;
    }
  }

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {});
}

function attachVideoTracking(videoElement) {
  if (!videoElement) return;

  const context = getVideoTrackingContext();
  const playback = {
    startedAt: null,
    accumulatedMs: 0,
    lastProgressSentAt: 0,
    lastKnownTime: 0,
  };

  if (context.recipientToken) {
    sendVideoTrackingEvent("page_open");
  }

  videoElement.addEventListener("play", () => {
    playback.startedAt = performance.now();
    sendVideoTrackingEvent("play", {
      currentTime: Number(videoElement.currentTime.toFixed(2)),
    });
  });

  videoElement.addEventListener("pause", () => {
    if (playback.startedAt !== null) {
      playback.accumulatedMs += performance.now() - playback.startedAt;
      playback.startedAt = null;
    }

    sendVideoTrackingEvent("pause", {
      currentTime: Number(videoElement.currentTime.toFixed(2)),
      watchedMs: Math.round(playback.accumulatedMs),
    });
  });

  videoElement.addEventListener("timeupdate", () => {
    playback.lastKnownTime = videoElement.currentTime;

    const now = performance.now();
    const secondsSinceLastProgress = (now - playback.lastProgressSentAt) / 1000;

    if (secondsSinceLastProgress < 10) {
      return;
    }

    playback.lastProgressSentAt = now;
    sendVideoTrackingEvent("progress", {
      currentTime: Number(videoElement.currentTime.toFixed(2)),
      duration: Number.isFinite(videoElement.duration)
        ? Number(videoElement.duration.toFixed(2))
        : null,
      watchedMs: Math.round(playback.accumulatedMs),
    });
  });

  videoElement.addEventListener("ended", () => {
    if (playback.startedAt !== null) {
      playback.accumulatedMs += performance.now() - playback.startedAt;
      playback.startedAt = null;
    }

    sendVideoTrackingEvent("ended", {
      currentTime: Number(videoElement.currentTime.toFixed(2)),
      duration: Number.isFinite(videoElement.duration)
        ? Number(videoElement.duration.toFixed(2))
        : null,
      watchedMs: Math.round(playback.accumulatedMs),
      completionRatio: Number.isFinite(videoElement.duration) && videoElement.duration > 0
        ? Number((playback.lastKnownTime / videoElement.duration).toFixed(4))
        : null,
    });
  });

  window.addEventListener("beforeunload", () => {
    if (playback.startedAt !== null) {
      playback.accumulatedMs += performance.now() - playback.startedAt;
      playback.startedAt = null;
    }

    sendVideoTrackingEvent("session_end", {
      currentTime: Number(videoElement.currentTime.toFixed(2)),
      duration: Number.isFinite(videoElement.duration)
        ? Number(videoElement.duration.toFixed(2))
        : null,
      watchedMs: Math.round(playback.accumulatedMs),
    });
  });
}
