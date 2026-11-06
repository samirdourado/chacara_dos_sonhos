// Gera as versões web das mídias enviadas pelo cliente (requer ffmpeg no PATH).
//
//   src/assets/images/*  →  src/assets/gallery/<nome>.webp        (até 1600px, lightbox)
//                           src/assets/gallery/<nome>-thumb.webp  (até 720px, grade)
//   src/assets/videos/*  →  src/assets/gallery/<nome>.mp4         (720p, 30fps, H.264)
//                           src/assets/gallery/<nome>-poster.webp (quadro de capa)
//
// Uso: npm run media:optimize            (pula arquivos já gerados)
//      npm run media:optimize -- --force (regera tudo)

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { basename, extname, join } from 'node:path'

const root = join(import.meta.dirname, '..', 'src', 'assets')
const imagesDir = join(root, 'images')
const videosDir = join(root, 'videos')
const outDir = join(root, 'gallery')
const force = process.argv.includes('--force')

// Segundo do vídeo usado como capa (padrão: 1s). Ajuste quando o início não for bonito.
const posterAt = { 'video-02': 6 }

const imageExt = new Set(['.png', '.jpg', '.jpeg', '.webp'])
const videoExt = new Set(['.mp4', '.mov', '.m4v', '.webm'])

function ffmpeg(args, output) {
  if (!force && existsSync(output)) {
    console.log(`  · ${basename(output)} (já existe)`)
    return
  }
  const result = spawnSync('ffmpeg', ['-v', 'error', '-y', ...args, output], {
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    throw new Error(`ffmpeg falhou ao gerar ${output}`)
  }
  console.log(`  ✓ ${basename(output)}`)
}

function filesIn(dir, extensions) {
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter((file) =>
    extensions.has(extname(file).toLowerCase()),
  )
}

mkdirSync(outDir, { recursive: true })

console.log('Imagens')
for (const file of filesIn(imagesDir, imageExt)) {
  const input = join(imagesDir, file)
  const name = basename(file, extname(file))
  ffmpeg(
    ['-i', input, '-vf', "scale='min(1600,iw)':-2", '-quality', '80'],
    join(outDir, `${name}.webp`),
  )
  ffmpeg(
    ['-i', input, '-vf', "scale='min(720,iw)':-2", '-quality', '72'],
    join(outDir, `${name}-thumb.webp`),
  )
}

console.log('Vídeos')
for (const file of filesIn(videosDir, videoExt)) {
  const input = join(videosDir, file)
  const name = basename(file, extname(file))
  ffmpeg(
    [
      '-i',
      input,
      '-vf',
      "scale='min(720,iw)':-2,fps=30",
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '27',
      '-profile:v',
      'high',
      '-pix_fmt',
      'yuv420p',
      '-c:a',
      'aac',
      '-b:a',
      '96k',
      '-movflags',
      '+faststart',
    ],
    join(outDir, `${name}.mp4`),
  )
  ffmpeg(
    [
      '-ss',
      String(posterAt[name] ?? 1),
      '-i',
      input,
      '-frames:v',
      '1',
      '-vf',
      'scale=720:-2',
      '-quality',
      '75',
    ],
    join(outDir, `${name}-poster.webp`),
  )
}
