import { useState } from 'react';

type ShareModalProps = {
  shareUrl: string;
  onClose: () => void;
};

export function ShareModal({ shareUrl, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const canCopy =
    typeof navigator !== 'undefined' && !!navigator.clipboard?.writeText;
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  async function handleCopy() {
    if (!canCopy) return;

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleMessage() {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: 'Pickleball schedule',
        text: 'Here is the pickleball schedule:',
        url: shareUrl,
      });
    } catch {
      // The user may cancel the native share sheet.
    }
  }

  return (
    <div className="share-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="share-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="share-modal-header">
          <h2 id="share-modal-title">Share this schedule</h2>
          <button
            className="share-modal-close"
            type="button"
            aria-label="Close share dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <label htmlFor="share-url-input">Copy this URL:</label>
        <input
          id="share-url-input"
          type="text"
          value={shareUrl}
          readOnly
          onFocus={(event) => event.currentTarget.select()}
        />
        <div className="share-modal-actions">
          <button type="button" onClick={handleCopy} disabled={!canCopy}>
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
          <button type="button" onClick={handleMessage} disabled={!canShare}>
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
