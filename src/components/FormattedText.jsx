import React from 'react';

// Formats general markdown-like AI responses without showing raw #, *, or •
export default function FormattedText({ text, dark }) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-2.5 space-y-1.5 pl-1">
          {listBuffer.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
              <span className="text-amber-500 font-bold mt-1 text-xs">•</span>
              <span className="leading-relaxed">{renderInline(item, dark)}</span>
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const renderInline = (str, isDark) => {
    if (!str) return null;
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        return (
          <strong
            key={index}
            className={`font-bold ${isDark ? 'text-amber-300' : 'text-amber-900'}`}
          >
            {inner}
          </strong>
        );
      }
      return part;
    });
  };

  lines.forEach((rawLine, lineIdx) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    // Header 1 or 2
    if (line.startsWith('# ') || line.startsWith('## ')) {
      flushList();
      const content = line.replace(/^#+\s*/, '').replace(/\*+/g, '').trim();
      elements.push(
        <h3
          key={`h2-${lineIdx}`}
          className={`text-lg sm:text-xl font-extrabold mt-3 mb-1.5 ${
            dark ? 'text-yellow-400' : 'text-yellow-800'
          }`}
        >
          {content}
        </h3>
      );
      return;
    }

    // Header 3 or 4
    if (line.startsWith('### ') || line.startsWith('#### ')) {
      flushList();
      const content = line.replace(/^#+\s*/, '').replace(/\*+/g, '').trim();
      elements.push(
        <h4
          key={`h3-${lineIdx}`}
          className={`text-sm sm:text-base font-bold mt-2.5 mb-1 ${
            dark ? 'text-amber-300' : 'text-amber-900'
          }`}
        >
          {content}
        </h4>
      );
      return;
    }

    // List item (-, *, •, or numbered "1.", "2.")
    const listMatch = line.match(/^[-*•]\s+(.*)/) || line.match(/^\d+\.\s+(.*)/);
    if (listMatch) {
      listBuffer.push(listMatch[1]);
      return;
    }

    // Standard paragraph line
    flushList();
    elements.push(
      <p key={`p-${lineIdx}`} className="my-1.5 leading-relaxed text-xs sm:text-sm">
        {renderInline(line, dark)}
      </p>
    );
  });

  flushList();

  return <div className="space-y-1">{elements}</div>;
}
