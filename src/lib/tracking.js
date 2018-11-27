export function dispatchTrackingEvent (detail) {
    const event = new CustomEvent('oTracking.event', {
        detail,
        bubbles: true
    });

    document.body.dispatchEvent(event);
}