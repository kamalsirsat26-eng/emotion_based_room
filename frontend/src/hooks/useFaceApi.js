import { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { emotionRules } from '../utils/moodMappings';

const MODEL_PATH = 'https://cdn.jsdelivr.net/npm/face-api.js@1.0.2/weights';

export default function useFaceApi(videoRef) {
  const [status, setStatus] = useState('initializing');
  const [emotionResult, setEmotionResult] = useState({ emotion: 'Neutral', confidence: 72 });

  useEffect(() => {
    let intervalId;
    const loadModels = async () => {
      try {
        setStatus('loading models');
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_PATH);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_PATH);
        setStatus('ready');
      } catch (error) {
        setStatus('model error');
      }
    };

    loadModels();

    const detectEmotion = async () => {
      if (!videoRef.current || videoRef.current.readyState < 2) {
        return;
      }
      const result = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();
      if (result?.expressions) {
        const mapping = emotionRules(result.expressions);
        setEmotionResult(mapping);
      }
    };

    if (videoRef.current) {
      intervalId = setInterval(detectEmotion, 1200);
    }

    return () => clearInterval(intervalId);
  }, [videoRef]);

  return { status, emotionResult };
}
