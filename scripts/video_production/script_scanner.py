#!/usr/bin/env python3
"""
Script Scanner Module
Scans directories for video production scripts matching specified patterns.
"""

import os
import glob
from pathlib import Path
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)


class ScriptScanner:
    """Scans for and identifies video production scripts."""
    
    def __init__(self, script_dir: str, script_pattern: str = "*.md"):
        """
        Initialize the script scanner.
        
        Args:
            script_dir: Directory to scan for scripts
            script_pattern: Glob pattern to match script files (e.g., *.md, *.txt)
        """
        self.script_dir = Path(script_dir)
        self.script_pattern = script_pattern
        
    def scan(self) -> List[Dict[str, str]]:
        """
        Scan the directory for scripts matching the pattern.
        
        Returns:
            List of dictionaries with script metadata:
            - path: Full path to the script
            - name: Filename without extension
            - extension: File extension
        """
        logger.info(f"Scanning {self.script_dir} for pattern: {self.script_pattern}")
        
        if not self.script_dir.exists():
            logger.error(f"Script directory does not exist: {self.script_dir}")
            return []
            
        # Search for scripts
        pattern = str(self.script_dir / self.script_pattern)
        script_files = glob.glob(pattern, recursive=False)
        
        # Also search recursively if pattern includes **
        if "**" not in self.script_pattern:
            recursive_pattern = str(self.script_dir / "**" / self.script_pattern)
            script_files.extend(glob.glob(recursive_pattern, recursive=True))
        
        # Remove duplicates and sort
        script_files = sorted(set(script_files))
        
        scripts = []
        for script_path in script_files:
            path = Path(script_path)
            scripts.append({
                "path": str(path.absolute()),
                "name": path.stem,
                "extension": path.suffix,
                "size": path.stat().st_size
            })
            
        logger.info(f"Found {len(scripts)} script(s)")
        for script in scripts:
            logger.info(f"  - {script['name']}{script['extension']} ({script['size']} bytes)")
            
        return scripts
    
    def validate_script(self, script_path: str) -> bool:
        """
        Validate that a script file is readable and non-empty.
        
        Args:
            script_path: Path to the script file
            
        Returns:
            True if valid, False otherwise
        """
        try:
            path = Path(script_path)
            if not path.exists():
                logger.error(f"Script does not exist: {script_path}")
                return False
                
            if path.stat().st_size == 0:
                logger.error(f"Script is empty: {script_path}")
                return False
                
            # Try to read the file
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read(100)  # Read first 100 chars to verify
                if not content.strip():
                    logger.error(f"Script contains no content: {script_path}")
                    return False
                    
            return True
            
        except Exception as e:
            logger.error(f"Error validating script {script_path}: {e}")
            return False
