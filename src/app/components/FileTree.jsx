import React, { useState, useCallback } from 'react';
import initialData from './initialData';
import FileList from './FileList';
import '../../../src/File.css';

export default function File() {
  // Holds the entire file tree structure (folders + files)
  const [tree, setTree] = useState(initialData);

  // The input box value used when adding a new file
  const [inputValue, setInputValue] = useState('');

  /**
   * updateAtPath(arr, path, updater)
   *
   * Recursively walks the file tree following an array of indexes (path),
   * and immutably updates exactly one node, using the updater function.
   *
   * arr = current level array (could be root, or a folder's .files)
   * path = e.g. [2, 0, 1]
   * updater = (node) => newNode
   */
  const updateAtPath = useCallback((arr, path, updater) => {
    console.log("arr", arr);
    console.log("path", path);
    console.log("updater", updater);

    // Safety check
    if (!Array.isArray(path) || path.length === 0) {
      console.warn('updateAtPath called with empty path', path);
      return arr;
    }

    // Destructure: idx is the current level index; rest is deeper path
    const [idx, ...rest] = path;

    // Map over array to immutably update exactly one matching index
    return arr.map((item, i) => {
      if (i !== idx) return item; // return all others unchanged

      // If no more steps, this is the node to update
      if (rest.length === 0) {
        return updater(item);
      }

      // Otherwise, recurse deeper into .files
      const childFiles = Array.isArray(item.files) ? item.files : [];

      return {
        ...item,
        files: updateAtPath(childFiles, rest, updater)
      };
    });
  }, []);

  /** Toggle folder open/closed */
  const toggleFolder = useCallback((path) => {
    console.log("path At Toggle", path);
    setTree(prev =>
      updateAtPath(prev, path, node => ({
        ...node,
        isOpen: !node.isOpen
      }))
    );
  }, [updateAtPath]);

  /** Convert a file into a folder (double-click) */
  const makeFolder = useCallback((path) => {
    console.log("path At makeFolder", path);
    setTree(prev =>
      updateAtPath(prev, path, node => ({
        ...node,
        files: Array.isArray(node.files) ? node.files : [], // ensure folder
        isOpen: true
      }))
    );
  }, [updateAtPath]);

  /** Add a new file into a folder */
  const addFile = useCallback((path) => {
    console.log("path At addFile", path);
    if (!inputValue.trim()) {
      window.alert('Enter file name');
      return;
    }

    setTree(prev =>
      updateAtPath(prev, path, node => ({
        ...node,
        files: [...(node.files || []), { name: inputValue.trim() }],
        isOpen: true
      }))
    );

    setInputValue(''); // reset input box
  }, [inputValue, updateAtPath]);

  return (
    <div className="layout-row justify-content-between">
      
      {/* Root-level file list */}
      <ul data-testid="files">
        <FileList
          nodes={tree}          // pass full tree
          pathPrefix={[]}       // root path is empty
          onToggle={toggleFolder}
          onMakeFolder={makeFolder}
          onAddFile={addFile}
        />
      </ul>

      {/* Input box for new files */}
      <input
        data-testid="input-box"
        type="text"
        placeholder="Enter an item"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ borderColor: 'black' }}
      />
    </div>
  );
}