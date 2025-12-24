import React from 'react';
import FileData from './FileData';

/**
 * FileList renders an array of nodes.
 * It simply maps over nodes and renders <FileData /> for each.
 *
 * pathPrefix = the path to THIS list (e.g. [0,2])
 * Each item adds its own index to produce its full path (e.g. [0,2,1])
 */
export default function FileList({ nodes = [], pathPrefix = [], onToggle, onMakeFolder, onAddFile }) {
  return (
    <>
      {nodes.map((node, i) => (
        <FileData
          key={`${node.name}-${i}`}   // unique key

          node={node}                 // the file/folder object

          // Example: pathPrefix [0] + index 2 → path [0,2]
          path={[...pathPrefix, i]}

          // Pass action handlers
          onToggle={onToggle}
          onMakeFolder={onMakeFolder}
          onAddFile={onAddFile}
        />
      ))}
    </>
  );
}