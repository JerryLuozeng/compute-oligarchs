import json
from pathlib import Path

from PIL import Image


BASE = Path(__file__).resolve().parent
RAW = BASE / "azgaar_states_raw.json"
AA_ID_MAP = BASE / "azgaar_region_id_map_aa.png"
ID_MAP = BASE / "azgaar_region_id_map.png"
PALETTE = BASE / "azgaar_region_palette.json"

SCALE = 4
WATER_ID = 0
WATER_COLOR = (0, 0, 0)


def id_to_color(region_id: int) -> tuple[int, int, int]:
    return (region_id & 255, (region_id >> 8) & 255, (region_id >> 16) & 255)


def nearest_palette_color(pixel: tuple[int, int, int], palette: list[tuple[int, int, int]]) -> tuple[int, int, int]:
    return min(
        palette,
        key=lambda color: (
            (pixel[0] - color[0]) ** 2
            + (pixel[1] - color[1]) ** 2
            + (pixel[2] - color[2]) ** 2
        ),
    )


def main() -> None:
    data = json.loads(RAW.read_text(encoding="utf-8"))
    _, _, width, height = data["viewBox"]
    out_w = round(width * SCALE)
    out_h = round(height * SCALE)

    source = Image.open(AA_ID_MAP).convert("RGB")
    if source.size != (out_w, out_h):
        raise ValueError(f"Expected {out_w}x{out_h}, got {source.size[0]}x{source.size[1]}")

    palette = [
        {
            "region_id": WATER_ID,
            "hex": "#000000",
            "name": "Water / background",
        }
    ]
    legal_colors = [WATER_COLOR]

    for index, path in enumerate(data["paths"], start=1):
        region_id = index
        color = id_to_color(region_id)
        legal_colors.append(color)

        palette.append(
            {
                "region_id": region_id,
                "hex": f"#{color[0]:02x}{color[1]:02x}{color[2]:02x}",
                "source_id": path["id"],
                "name": path["name"],
            }
        )

    color_cache: dict[tuple[int, int, int], tuple[int, int, int]] = {}
    id_img = Image.new("RGB", source.size)
    out_pixels = []
    for pixel in source.getdata():
        color = color_cache.get(pixel)
        if color is None:
            color = pixel if pixel in legal_colors else nearest_palette_color(pixel, legal_colors)
            color_cache[pixel] = color
        out_pixels.append(color)

    id_img.putdata(out_pixels)
    colors = id_img.getcolors(maxcolors=out_w * out_h)
    visible_pixels = {
        color[0] + (color[1] << 8) + (color[2] << 16): count
        for count, color in colors
    }
    for item in palette:
        pixels = visible_pixels.get(item["region_id"], 0)
        item["visible_pixels"] = pixels
        item["is_visible"] = pixels > 0

    id_img.save(ID_MAP)
    PALETTE.write_text(json.dumps(palette, indent=2), encoding="utf-8")

    print(f"Wrote {ID_MAP}")
    print(f"Wrote {PALETTE}")
    print(f"Regions: {len(data['paths'])}, size: {out_w}x{out_h}")


if __name__ == "__main__":
    main()
