import React from 'react';

/**
 * FileData represents a single item in the tree:
 * - could be a file   (no files property)
 * - could be a folder (files = array)
 */
export default function FileData({ node, path = [], onToggle, onMakeFolder, onAddFile }) {
  
  // Determine if this node is a folder
  const isFolder = Array.isArray(node.files);

  /** Single-click: toggle folder */
  const handleClick = (e) => {
    e.stopPropagation();      // prevent parent events
    if (isFolder) onToggle(path);
  };

  /** Double-click: convert file → folder */
  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (!isFolder) onMakeFolder(path);
  };

  return (
    <li>

      {/* Node header (button + optional [+]/[-] indicator) */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        
        <button onClick={handleClick} onDoubleClick={handleDoubleClick}>
          {node.name}
          
          {/* Show folder open/close marker */}
          {isFolder && <span>{node.isOpen ? '[-]' : '[+]'}</span>}
        </button>

      
      </div>

      {/* If open folder → render children recursively */}
      {isFolder && node.isOpen && (
        <ul>
          {node.files.map((child, i) => (
            <FileData
              key={`${child.name}-${i}`}     // required for list rendering
              node={child}
              
              // Build deeper path: e.g. [0,1] → child 2 → [0,1,2]
              path={[...path, i]}           
              
              onToggle={onToggle}
              onMakeFolder={onMakeFolder}
              onAddFile={onAddFile}
            />
          ))}
        </ul>
      )}

        {/* "+" button only if this is an open folder */}
        {isFolder && node.isOpen && (
          <button
            aria-label={`add-to-${node.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddFile(path);
            }}
            style={{ marginLeft: 6 }}
          >
            +
          </button>
        )}

    </li>
  );
}