Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public static class FridgeIcon2 {
  static int Dist2(Color a, Color b) {
    int dr = a.R - b.R, dg = a.G - b.G, db = a.B - b.B;
    return dr * dr + dg * dg + db * db;
  }

  public static string Process(string input, string dir) {
    using (var loaded = new Bitmap(input))
    using (var src = new Bitmap(loaded.Width, loaded.Height, PixelFormat.Format32bppArgb)) {
      using (var g = Graphics.FromImage(src)) g.DrawImage(loaded, 0, 0, loaded.Width, loaded.Height);

      int w = src.Width, h = src.Height;
      Color canvas = src.GetPixel(6, 6);

      int left = Math.Min(FirstDiffX(src, canvas, (int)(h * 0.20), true), FirstDiffX(src, canvas, (int)(h * 0.28), true));
      int right = Math.Max(FirstDiffX(src, canvas, (int)(h * 0.20), false), FirstDiffX(src, canvas, (int)(h * 0.28), false));
      int top = FirstDiffY(src, canvas, (int)(w * 0.50), true);
      int bottom = FirstDiffY(src, canvas, (int)(w * 0.50), false);

      string info = string.Format("size={0}x{1} canvas={2},{3},{4} LTRB={5},{6},{7},{8}", w, h, canvas.R, canvas.G, canvas.B, left, top, right, bottom);

      int pad = Math.Max(4, (int)(w * 0.004));
      left = Math.Max(0, left - pad);
      top = Math.Max(0, top - pad);
      right = Math.Min(w - 1, right + pad);

      int side = right - left + 1;
      if (top + side > h) side = h - top;
      // Keep a square from the top of the tile so the drop shadow is cropped off.

      Color cream = src.GetPixel(left + side / 2, top + (int)(side * 0.10));

      using (var opaque = src.Clone(new Rectangle(left, top, side, side), PixelFormat.Format32bppArgb))
      using (var trans = src.Clone(new Rectangle(left, top, side, side), PixelFormat.Format32bppArgb)) {
        PaintCorners(opaque, canvas, cream, false);
        PaintCorners(trans, canvas, Color.FromArgb(0, 0, 0, 0), true);

        SaveSized(opaque, 1024, dir + "\\icon-1024.png");
        SaveSized(opaque, 512, dir + "\\icon-512.png");
        SaveSized(opaque, 192, dir + "\\icon-192.png");
        SaveSized(opaque, 180, dir + "\\apple-touch-icon.png");
        SaveSized(trans, 1024, dir + "\\icon-app.png");
      }

      return info;
    }
  }

  static int FirstDiffX(Bitmap src, Color canvas, int y, bool fromLeft) {
    int w = src.Width;
    int thresh = 16 * 16;
    if (fromLeft) {
      for (int x = 0; x < w; x++) if (Dist2(src.GetPixel(x, y), canvas) > thresh) return x;
      return 0;
    }
    for (int x = w - 1; x >= 0; x--) if (Dist2(src.GetPixel(x, y), canvas) > thresh) return x;
    return w - 1;
  }

  static int FirstDiffY(Bitmap src, Color canvas, int x, bool fromTop) {
    int h = src.Height;
    int thresh = 16 * 16;
    if (fromTop) {
      for (int y = 0; y < h; y++) if (Dist2(src.GetPixel(x, y), canvas) > thresh) return y;
      return 0;
    }
    for (int y = h - 1; y >= 0; y--) if (Dist2(src.GetPixel(x, y), canvas) > thresh) return y;
    return h - 1;
  }

  static void PaintCorners(Bitmap bmp, Color canvas, Color fill, bool alpha) {
    int w = bmp.Width, h = bmp.Height;
    int r = (int)(Math.Min(w, h) * 0.225);
    int thresh = 20 * 20;
    for (int y = 0; y < h; y++) {
      for (int x = 0; x < w; x++) {
        bool corner = (x < r && y < r) || (x >= w - r && y < r) || (x < r && y >= h - r) || (x >= w - r && y >= h - r);
        if (!corner) continue;
        int cx = x < r ? r : w - 1 - r;
        int cy = y < r ? r : h - 1 - r;
        int dx = x - cx, dy = y - cy;
        if (dx * dx + dy * dy <= r * r) continue;
        Color p = bmp.GetPixel(x, y);
        if (Dist2(p, canvas) <= thresh || (p.R + p.G + p.B) > 730) {
          bmp.SetPixel(x, y, alpha ? Color.FromArgb(0, p) : fill);
        }
      }
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

[FridgeIcon2]::Process("C:\Fridge Korea\public\app-icon.jpg", "C:\Fridge Korea\public")
