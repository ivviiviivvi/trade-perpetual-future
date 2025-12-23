#!/usr/bin/env python3
"""
Video Production Orchestrator
Main orchestration script for automated video production from scripts.
"""

import os
import sys
import logging
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional
import json

# Add current directory to path
sys.path.insert(0, str(Path(__file__).parent))

from script_scanner import ScriptScanner
from script_parser import ScriptParser
from audio_generator import AudioGenerator
from visual_generator import VisualGenerator
from video_assembler import VideoAssembler

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


class VideoProductionOrchestrator:
    """Orchestrates the complete video production workflow."""
    
    def __init__(self, config: Dict):
        """
        Initialize the orchestrator.
        
        Args:
            config: Configuration dictionary with environment variables
        """
        self.config = config
        self.repo_root = Path(config.get('REPO_ROOT', '.')).absolute()
        self.script_dir = Path(config.get('SCRIPT_DIR', 'docs/hiring-portfolio')).absolute()
        self.script_pattern = config.get('SCRIPT_PATTERN', '*.md')
        self.video_out_dir = Path(config.get('VIDEO_OUT_DIR', 'video_output')).absolute()
        self.demo_url = config.get('DEMO_URL')
        self.voice_mode = config.get('VOICE_MODE', 'local_tts')
        self.resolution = config.get('VIDEO_RESOLUTION', '1920x1080')
        self.fps = int(config.get('FPS', '30'))
        self.headless = config.get('HEADLESS', 'true').lower() == 'true'
        
        # Create output directories
        self.video_out_dir.mkdir(parents=True, exist_ok=True)
        self.audio_dir = self.video_out_dir / 'audio'
        self.visuals_dir = self.video_out_dir / 'visuals'
        self.logs_dir = self.video_out_dir / 'logs'
        
        for dir_path in [self.audio_dir, self.visuals_dir, self.logs_dir]:
            dir_path.mkdir(parents=True, exist_ok=True)
        
        logger.info("="*80)
        logger.info("VIDEO PRODUCTION AGENT INITIALIZED")
        logger.info("="*80)
        logger.info(f"Repository root: {self.repo_root}")
        logger.info(f"Script directory: {self.script_dir}")
        logger.info(f"Script pattern: {self.script_pattern}")
        logger.info(f"Output directory: {self.video_out_dir}")
        logger.info(f"Demo URL: {self.demo_url or 'None'}")
        logger.info(f"Voice mode: {self.voice_mode}")
        logger.info(f"Resolution: {self.resolution} @ {self.fps} FPS")
        logger.info(f"Headless mode: {self.headless}")
        logger.info("="*80)
    
    def run(self) -> Dict:
        """
        Execute the complete video production workflow.
        
        Returns:
            Dictionary with results summary
        """
        start_time = datetime.now()
        results = {
            "start_time": start_time.isoformat(),
            "config": self.config,
            "videos_created": [],
            "videos_failed": [],
            "logs": []
        }
        
        try:
            # Step 1: Scan for scripts
            logger.info("\n" + "="*80)
            logger.info("STEP 1: SCANNING FOR SCRIPTS")
            logger.info("="*80)
            
            scanner = ScriptScanner(self.script_dir, self.script_pattern)
            scripts = scanner.scan()
            
            if not scripts:
                logger.error("No scripts found matching pattern")
                results["logs"].append("ERROR: No scripts found")
                return results
            
            logger.info(f"Found {len(scripts)} script(s) to process")
            results["logs"].append(f"Found {len(scripts)} scripts")
            
            # Step 2: Process each script
            for script in scripts:
                script_result = self._process_script(script)
                
                if script_result["success"]:
                    results["videos_created"].append(script_result)
                else:
                    results["videos_failed"].append(script_result)
            
            # Summary
            end_time = datetime.now()
            duration = (end_time - start_time).total_seconds()
            
            results["end_time"] = end_time.isoformat()
            results["duration_seconds"] = duration
            results["success_count"] = len(results["videos_created"])
            results["failure_count"] = len(results["videos_failed"])
            
            logger.info("\n" + "="*80)
            logger.info("VIDEO PRODUCTION COMPLETE")
            logger.info("="*80)
            logger.info(f"Total time: {duration:.1f} seconds")
            logger.info(f"Videos created: {results['success_count']}")
            logger.info(f"Videos failed: {results['failure_count']}")
            logger.info("="*80)
            
            # Save summary log
            self._save_summary_log(results)
            
        except Exception as e:
            logger.error(f"Fatal error in orchestrator: {e}", exc_info=True)
            results["logs"].append(f"FATAL ERROR: {e}")
        
        return results
    
    def _process_script(self, script: Dict) -> Dict:
        """
        Process a single script to produce a video.
        
        Args:
            script: Script metadata dictionary
            
        Returns:
            Result dictionary
        """
        script_path = script['path']
        script_name = script['name']
        
        result = {
            "script_name": script_name,
            "script_path": script_path,
            "success": False,
            "video_path": None,
            "log_path": None,
            "errors": [],
            "fallbacks": []
        }
        
        # Create script-specific log
        log_file = self.logs_dir / f"{script_name}_log.txt"
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(logging.INFO)
        file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
        logger.addHandler(file_handler)
        
        try:
            logger.info("\n" + "="*80)
            logger.info(f"PROCESSING SCRIPT: {script_name}")
            logger.info("="*80)
            
            # Step 2.1: Parse script
            logger.info("\nParsing script structure...")
            parser = ScriptParser(script_path)
            
            if not parser.load():
                error = "Failed to load script"
                logger.error(error)
                result["errors"].append(error)
                return result
            
            scenes = parser.parse()
            
            if not scenes:
                error = "No scenes found in script"
                logger.error(error)
                result["errors"].append(error)
                return result
            
            logger.info(f"✓ Parsed {len(scenes)} scene(s)")
            logger.info(f"  Total word count: {parser.get_total_word_count()}")
            logger.info(f"  Estimated duration: {parser.estimate_duration():.1f} seconds")
            
            # Step 2.2: Generate audio
            logger.info("\n" + "-"*80)
            logger.info("Generating narration audio...")
            logger.info("-"*80)
            
            audio_gen = AudioGenerator(self.audio_dir, self.voice_mode)
            audio_files = audio_gen.generate_from_scenes(scenes, script_name)
            
            if not audio_files:
                error = "No audio files were generated"
                logger.error(error)
                result["errors"].append(error)
                result["fallbacks"].append("Audio generation failed, cannot continue")
                return result
            
            logger.info(f"✓ Generated {len(audio_files)} audio file(s)")
            
            # Step 2.3: Generate visuals
            logger.info("\n" + "-"*80)
            logger.info("Generating visuals...")
            logger.info("-"*80)
            
            visual_gen = VisualGenerator(self.visuals_dir, self.resolution, self.fps)
            visual_files = visual_gen.generate_for_scenes(
                scenes,
                script_name,
                self.demo_url,
                self.headless
            )
            
            if not visual_files:
                error = "No visual files were generated"
                logger.error(error)
                result["errors"].append(error)
                result["fallbacks"].append("Visual generation failed")
                return result
            
            logger.info(f"✓ Generated {len(visual_files)} visual file(s)")
            
            # Check for fallbacks used
            for vf in visual_files:
                if vf['type'] == 'title_card':
                    result["fallbacks"].append(f"Scene {vf['scene_num']}: Used title card (demo/diagram unavailable)")
            
            # Step 2.4: Assemble video
            logger.info("\n" + "-"*80)
            logger.info("Assembling final video...")
            logger.info("-"*80)
            
            assembler = VideoAssembler(self.video_out_dir, self.resolution, self.fps)
            video_path = assembler.assemble(script_name, scenes, audio_files, visual_files)
            
            if video_path:
                logger.info(f"✓ Video created: {video_path}")
                result["success"] = True
                result["video_path"] = video_path
                result["log_path"] = str(log_file)
            else:
                error = "Video assembly failed"
                logger.error(error)
                result["errors"].append(error)
            
        except Exception as e:
            error = f"Error processing script: {e}"
            logger.error(error, exc_info=True)
            result["errors"].append(error)
        
        finally:
            # Remove file handler
            logger.removeHandler(file_handler)
            file_handler.close()
        
        return result
    
    def _save_summary_log(self, results: Dict) -> None:
        """Save summary log of all operations."""
        summary_file = self.logs_dir / "production_summary.json"
        
        try:
            with open(summary_file, 'w') as f:
                json.dump(results, f, indent=2)
            
            logger.info(f"\nSummary log saved: {summary_file}")
            
            # Also create a human-readable summary
            text_summary = self.logs_dir / "production_summary.txt"
            with open(text_summary, 'w') as f:
                f.write("VIDEO PRODUCTION SUMMARY\n")
                f.write("="*80 + "\n\n")
                f.write(f"Start time: {results['start_time']}\n")
                f.write(f"End time: {results['end_time']}\n")
                f.write(f"Duration: {results['duration_seconds']:.1f} seconds\n\n")
                
                f.write(f"Videos created: {results['success_count']}\n")
                f.write(f"Videos failed: {results['failure_count']}\n\n")
                
                if results['videos_created']:
                    f.write("SUCCESSFUL VIDEOS:\n")
                    f.write("-"*80 + "\n")
                    for video in results['videos_created']:
                        f.write(f"  {video['script_name']}\n")
                        f.write(f"    Video: {video['video_path']}\n")
                        f.write(f"    Log: {video['log_path']}\n")
                        if video.get('fallbacks'):
                            f.write(f"    Fallbacks used:\n")
                            for fb in video['fallbacks']:
                                f.write(f"      - {fb}\n")
                        f.write("\n")
                
                if results['videos_failed']:
                    f.write("\nFAILED VIDEOS:\n")
                    f.write("-"*80 + "\n")
                    for video in results['videos_failed']:
                        f.write(f"  {video['script_name']}\n")
                        if video.get('errors'):
                            f.write(f"    Errors:\n")
                            for err in video['errors']:
                                f.write(f"      - {err}\n")
                        f.write("\n")
            
            logger.info(f"Text summary saved: {text_summary}")
            
        except Exception as e:
            logger.error(f"Error saving summary log: {e}")


def load_config_from_env() -> Dict:
    """Load configuration from environment variables."""
    return {
        'REPO_ROOT': os.getenv('REPO_ROOT', os.getcwd()),
        'SCRIPT_DIR': os.getenv('SCRIPT_DIR', 'docs/hiring-portfolio'),
        'SCRIPT_PATTERN': os.getenv('SCRIPT_PATTERN', '*.md'),
        'DEMO_URL': os.getenv('DEMO_URL'),
        'VIDEO_OUT_DIR': os.getenv('VIDEO_OUT_DIR', 'video_output'),
        'VOICE_MODE': os.getenv('VOICE_MODE', 'local_tts'),
        'VIDEO_RESOLUTION': os.getenv('VIDEO_RESOLUTION', '1920x1080'),
        'FPS': os.getenv('FPS', '30'),
        'HEADLESS': os.getenv('HEADLESS', 'true'),
    }


def main():
    """Main entry point."""
    config = load_config_from_env()
    
    orchestrator = VideoProductionOrchestrator(config)
    results = orchestrator.run()
    
    # Exit with appropriate code
    if results['failure_count'] > 0:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == '__main__':
    main()
