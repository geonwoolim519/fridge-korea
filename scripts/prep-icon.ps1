Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public static class FridgeIconBlack {
  static bool IsBackdrop(Color p) {
    return p.R + p.G + p.B < 72;
  }

  public static string Process(string input, string dir) {
    using (var loaded = new Bitmap(input))
    using (var src = new Bitmap(loaded.Width, loaded.Height, PixelFormat.Format32bppArgb)) {
      using (var g = Graphics.FromImage(src)) g.DrawImage(loaded, 0, 0, loaded.Width, loaded.Height);

      int w = src.Width, h = src.Height;
      bool[,] outer = new bool[w, h];
      Flood(src, outer, 0, 0);
      Flood(src, outer, w - 1, 0);
      Flood(src, outer, 0, h - 1);
      Flood(src, outer, w - 1, h - 1);

      int minX = w, minY = h, maxX = 0, maxY = 0;
      for (int y = 0; y < h; y++) {
        for (int x = 0; x < w; x++) {
          if (!outer[x, y]) {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
      }

      int pad = Math.Max(2, (int)(w * 0.004));
      minX = Math.Max(0, minX - pad);
      minY = Math.Max(0, minY - pad);
      maxX = Math.Min(w - 1, maxX + pad);
      maxY = Math.Min(h - 1, maxY + pad);

      int side = Math.Max(maxX - minX + 1, maxY - minY + 1);
      int cx = (minX + maxX) / 2;
      int cy = (minY + maxY) / 2;
      minX = Math.Max(0, cx - side / 2);
      minY = Math.Max(0, cy - side / 2);
      if (minX + side > w) minX = w - side;
      if (minY + side > h) minY = h - side;
      side = Math.Min(side, Math.Min(w - minX, h - minY));

      Color cream = Color.FromArgb(255, 245, 239, 229);
      int sampleX = cx;
      int sampleY = minY + (int)(side * 0.10);
      if (sampleX >= 0 && sampleY >= 0 && sampleX < w && sampleY < h && !outer[sampleX, sampleY]) {
        cream = Color.FromArgb(255, src.GetPixel(sampleX, sampleY));
      }

      using (var opaque = new Bitmap(side, side, PixelFormat.Format32bppArgb))
      using (var trans = new Bitmap(side, side, PixelFormat.Format32bppArgb)) {
        using (var go = Graphics.FromImage(opaque)) go.Clear(cream);
        using (var gt = Graphics.FromImage(trans)) gt.Clear(Color.Transparent);

        for (int y = 0; y < side; y++) {
          for (int x = 0; x < side; x++) {
            int sx = minX + x;
            int sy = minY + y;
            if (outer[sx, sy]) continue;
            Color p = Color.FromArgb(255, src.GetPixel(sx, sy));
            opaque.SetPixel(x, y, p);
            trans.SetPixel(x, y, p);
          }
        }

        SaveSized(opaque, 1024, dir + "\\icon-1024.png");
        SaveSized(opaque, 512, dir + "\\icon-512.png");
        SaveSized(opaque, 192, dir + "\\icon-192.png");
        SaveSized(opaque, 180, dir + "\\apple-touch-icon.png");
        SaveSized(trans, 1024, dir + "\\icon-app.png");
      }

      return string.Format("size={0}x{1} crop={2},{3} side={4} cream={5},{6},{7}", w, h, minX, minY, side, cream.R, cream.G, cream.B);
    }
  }

  static void Flood(Bitmap src, bool[,] mask, int sx, int sy) {
    int w = src.Width, h = src.Height;
    var q = new Queue<Point>();
    q.Enqueue(new Point(sx, sy));
    while (q.Count > 0) {
      Point pt = q.Dequeue();
      if (pt.X < 0 || pt.Y < 0 || pt.X >= w || pt.Y >= h || mask[pt.X, pt.Y]) continue;
      if (!IsBackdrop(src.GetPixel(pt.X, pt.Y))) continue;
      mask[pt.X, pt.Y] = true;
      q.Enqueue(new Point(pt.X + 1, pt.Y));
      q.Enqueue(new Point(pt.X - 1, pt.Y));
      q.Enqueue(new Point(pt.X, pt.Y + 1));
      q.Enqueue(new Point(pt.X, pt.Y - 1));
    }
  }

  static void SaveSized(Bitmap src, int size, string path) {
    using (var dst = new Bitmap(size, size, PixelFormat.Format32bppArgb))
    using (var g = Graphics.FromImage(dst)) {
      g.InterpolationMode = InterpolationMode.HighQualityBicubic;
      g.SmoothingMode = SmoothingMode.HighQuality;
      g.PixelOffsetMode = PixelOffsetMode.HighQuality;
      g.CompositingQuality = CompositingQuality.HighQuality;
      g.Clear(Color.Transparent);
      g.DrawImage(src, 0, 0, size, size);
      dst.Save(path, ImageFormat.Png);
    }
  }
}
"@

$src = "C:\Users\geony\.cursor\projects\c-Fridge-Korea\assets\c__Users_geony_AppData_Roaming_Cursor_User_workspaceStorage_a635ee47715f3114db587d305e5fc2b1_images_ChatGPT_Image_2026__9__12_____11_06_54-76cc5f7a-f5ea-48fc-bef2-53381338c2ed.jpg"
Copy-Item -Force $src "C:\Fridge Korea\public\app-icon.jpg"
[FridgeIconBlack]::Process($src, "C:\Fridge Korea\public")
