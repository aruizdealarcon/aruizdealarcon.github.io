----------------------------------------------------------------------
-- tikzmod export ipelet
----------------------------------------------------------------------
--[[

    Copyright (C) 2016  Joseph Rabinoff. Modified by Alberto Ruiz de Alarcon

    ipe2tikz is free software; you can redistribute it and/or modify it under
    the terms of the GNU General Public License as published by the Free
    Software Foundation; either version 3 of the License, or (at your option)
    any later version.

    ipe2tikz is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
    details.

    You should have received a copy of the GNU General Public License along with
    ipe2tikz; if not, you can find it at "http://www.gnu.org/copyleft/gpl.html",
    or write to the Free Software Foundation, Inc., 675 Mass Ave, Cambridge, MA
    02139, USA.

--]]


label = "TikZ Export Modified"

methods = {
   { label="Export selection", run=run },
}

about = "Export readable TikZ code"

shortcuts.ipelet_1_tikzmod = "Ctrl+Shift+T"

-- Globals
write = _G.io.write
indent_amt = "    "
indent = ""


--------------------------------------------------------------------------------
-- Utility
--------------------------------------------------------------------------------

function concat_pairs(t, sep, order)
   local ret = ""
   local first = true
   for i,key in ipairs(order) do
      if t[key] then
         if not first then
            ret = ret .. sep
         else
            first = false
         end
         ret = ret .. key .. "=" .. t[key]
      end
   end
   return ret
end


-- Round a number to idp decimal places
function round(num, idp)
  local mult = 10^(idp or 4)
  return math.floor(num * mult + 0.5) / mult
end


-- Convert a number to a string, omitting trailing zeros after the decimal, and
-- rounding.
function sround(num, idp)
   idp = idp or 4
   num = round(num/50, idp)
   local neg = (num < 0)
   if neg then
      num = -num
      neg = "-"
   else
      neg = ""
   end
   local intpart = math.floor(num)
   local fracpart = num - intpart
   local intstr = string.format("%d", intpart)
   local fracstr

   if fracpart == 0 then
      return neg .. intstr
   end

   while idp > 0 do
      fracstr = string.format("%."..idp.."f", fracpart)
      if string.sub(fracstr, -1) ~= "0" then
         -- get rid of leading zero
         return neg .. intstr .. string.sub(fracstr, 2)
      end
      idp = idp - 1
   end
end



-- Convert a number to a string, omitting trailing zeros after the decimal, and
-- rounding.
function sroundang(num, idp)
   idp = idp or 4
   num = round(num, idp)
   local neg = (num < 0)
   if neg then
      num = -num
      neg = "-"
   else
      neg = ""
   end
   local intpart = math.floor(num)
   local fracpart = num - intpart
   local intstr = string.format("%d", intpart)
   local fracstr

   if fracpart == 0 then
      return neg .. intstr
   end

   while idp > 0 do
      fracstr = string.format("%."..idp.."f", fracpart)
      if string.sub(fracstr, -1) ~= "0" then
         -- get rid of leading zero
         return neg .. intstr .. string.sub(fracstr, 2)
      end
      idp = idp - 1
   end
end


-- Convert a Vector to a string, after rounding
function svec(vec, idp)
   return "(" .. sround(vec.x, idp) .. ", " .. sround(vec.y, idp) .. ")"
end


-- Check if the linear part of a matrix is the identity, after rounding
function is_almost_identity(matrix)
   local a, c, b, d = table.unpack(matrix:coeff())
   return (round(a) == 1 and round(b) == 0 and round(c) == 0 and round(d) == 1)
end


-- One should be able to say "if tonumber(str) then ... end", but it seems to be
-- bugged on my system, because tonumber(str) returns 0 for an invalid number.
-- So I have to use a regex.
function is_number(str)
   return (string.find(str, "^[-+]?%d*%.?%d*$") ~= nil)
end


-- Calculate a bounding box for selected, visible objects
function bounding_box(model)
   local page = model:page()
   local box = ipe.Rect()
   for i,obj,sel,layer in page:objects() do
      if page:visible(model.vno, i) and sel then box:add(page:bbox(i)) end
   end
   return box
end


--------------------------------------------------------------------------------
-- Translate attributes into options
--------------------------------------------------------------------------------

-- Read a value which is one of:
--  1) a string containing a number
--  2) a string
--  3) the string "undefined" or the string "normal"
--  4) nil
-- In case (1), add "key=value" to options.  In case (2), add prepend .. "value"
-- to options.  In cases (3) and (4), don't do anything.
function number_option(value, key, options, prepend)
   if not value or value == "undefined" or value == "normal" then
      -- do nothing
   elseif is_number(value) then
      table.insert(options, key .. "=" .. value)
   else
      table.insert(options, (prepend or "") .. value)
   end
end


-- Read a value which is one of:
--  1) a string
--  2) a table with keys r, g, b
--  3) the string "undefined"
--  4) nil
-- In case (1), add "key=..prepend..value" to options, unless key_optional is
-- true, in which case, just add "..prepend..value".  In case (2), "rgb
-- color={key=r g b}" is added.  In cases (3) and (4), nothing happens.
function color_option(value, key, options, prepend, key_optional)
   -- Sometimes white and black don't get stored as symbols
   if _G.type(value) == "table" then
      if round(value.r) == 1 and
           round(value.g) == 1 and
           round(value.b) == 1 then
         value = "white"
      elseif round(value.r) == 0 and
           round(value.g) == 0 and
           round(value.b) == 0 then
         value = "black"
      end
   end

   if not value or value == "undefined" then
      -- do nothing
   elseif _G.type(value) == "string" then
      if key_optional then
         key = ""
      else
         key = key .. "="
      end
      table.insert(options, key .. (prepend or "") .. value)
   elseif _G.type(value) == "table" then
      table.insert(options, string.format(
                      "rgb color={%s=%s %s %s}", key,
                      sround(value.r), sround(value.g), sround(value.b)))
   else
      print("Illegal color value:" .. tostring(value))
   end
end


-- Pass a string as an option.  If value is "undefined" or "normal" or nil,
-- don't do anything.  Otherwise, add "key=..prepend..value", unless key is nil,
-- in which case just add "prepend..value".
function string_option(value, key, options, prepend)
   if not value or value == "undefined" or value == "normal" then
      -- do nothing
   elseif key then
      table.insert(options, key .. "=" .. (prepend or "") .. value)
   else
      table.insert(options, (prepend or "") .. value)
   end
end


-- Turn an arrow name and size into an arrow spec, using the following
-- procedure.
--  * "shape" is parsed as "Arrow[options]", and is normally returned directly.
--  * If "size" is not "normal", it is interpreted as a number_option() and
--    appended to the arrow options.
--  * If Arrow is "To", it is replaced by ">".
--  * If Arrow is "Bar", it is replaced by "|".
--  * "Arrow" can also have the form "Arrow1[options2] Arrow2[options2] ...", in
--    which case it is also returned like this (with "To" being replaced by
--    ">").  The "size" option goes in brackets at the beginning the arrow spec.
--  * If Forward is false, ">" is replaced by "<".
--
-- In ipe the arrows inherit the line join and cap style from the path, and in
-- TikZ they don't.  This follows TikZ's behavior.
function arrow_spec(shapes, size, forward)
   local ret = ""
   _, _, shapes = string.find(shapes, "arrow/([^(]+)%(")

   local sizeopt = {}
   number_option(size, "scale", sizeopt, "ipe arrow ")
   if #sizeopt > 0 then
      sizeopt = sizeopt[1]
   else
      sizeopt = nil
   end

   local arrows = {}
   local function parse_arrow(shape)
      local arrow = nil
      local options = nil
      _, _, arrow, options = string.find(shape, "^(%S+)%[(%S+)%]$")
      if not arrow then
      _, _, arrow = string.find(shape, "^(%S+)$")
      end
      if arrow == "To" or arrow == "normal" then
         if forward then arrow = ">-" else arrow = "-<" end
      elseif arrow == "Bar" then
         arrow = "|"
      end
      if forward then
         table.insert(arrows, {arrow=arrow, options=options})
      else -- reverse order
         table.insert(arrows, 1, {arrow=arrow, options=options})
      end
      return ""
   end

   string.gsub(shapes .. " ", "(%S+)%s", parse_arrow)

   local multiple = (#arrows > 1)

   if multiple and sizeopt then
      ret = "[" .. sizeopt .. "]"
   end
   for _,arrow in ipairs(arrows) do
      if sizeopt and not multiple then
         if arrow.options then
            arrow.options = arrow.options .. "," .. sizeopt
         else
            arrow.options = sizeopt
         end
      end
      ret = ret .. arrow.arrow
      if arrow.options then
         ret = ret .. "[" .. arrow.options .. "]"
      end
   end

   if string.find(ret, "%[") then
      return "{" .. ret .. "}"
   else
      return ret
   end
end


-- Turns a PDF-style dash specification "[1 2 3 4] 5" into "dash pattern" and
-- "dash phase" options
function dash_options(dash)
   local ret = ""
   local dashstr, phase
   local dashes = {}
   _, _, dashstr, phase = string.find(dash, "%[(.*)%]%s*(%S+)")

   local onedash
   _, _, onedash = string.find(dashstr, "^%s*(%S+)%s*$")
   if onedash then
      table.insert(dashes, string.format("on %sbp off %sbp", onedash, onedash))
   else
      local function add_dash(on, off)
         table.insert(dashes, string.format("on %sbp off %sbp", on, off))
      end
      string.gsub(dashstr .. " ", "(%S+)%s+(%S+)%s+", add_dash)
   end

   ret = "dash pattern=" .. table.concat(dashes, " ")
   if tonumber(phase) ~= 0 then
      ret = ret .. ", dash phase=" .. phase .. "bp"
   end
   return ret
end


--------------------------------------------------------------------------------
-- Decompose matrix and turn into options
--------------------------------------------------------------------------------

-- Decompose the linear part of a matrix into scale then rotate, or rotate then
-- scale, if possible.  If not, just return the matrix.
function mat_decompose(matrix)
   local a, c, b, d = table.unpack(matrix:coeff())
   local norm1, norm2
   local ret = {}

   if is_almost_identity(matrix) then
      ret["type"] = "identity"
      return ret
   end

   -- Check just scale
   if round(b) == 0 and round(c) == 0 then
        ret["type"] = "scale"
      if round(a) == round(d) then
         table.insert(ret, {type="scale", scale=a})
      else
         table.insert(ret, {type="xyscale", xscale=a, yscale=d})
      end
      return ret
   end

   -- Check just rotate
   norm1 = math.sqrt(a^2 + c^2)
   norm2 = math.sqrt(b^2 + d^2)
   if round(norm1) == 1 and round(norm2) == 1
         and round(a) == round(d)
         and round(b) == round(-c) then
      ret["type"] = "rotate"
      table.insert(ret, {type="rotate",
                         angle=math.atan2(-b,a)*180/math.pi})
      return ret
   end

   -- Check scale then rotate
   if round(a/norm1) == round(d/norm2)
         and round(c/norm1) == round(-b/norm2) then
      ret["type"] = "scale,rotate"
      if round(norm1) == round(norm2) then
         table.insert(ret, {type="scale", scale=norm1})
      else
         table.insert(ret, {type="xyscale",
                            xscale=norm1, yscale=norm2})
      end
      table.insert(ret,
                   {type="rotate",
                    angle=math.atan2(-b/norm2,a/norm1)*180/math.pi})
      return ret

   elseif round(a/norm1) == round(-d/norm2)
         and round(c/norm1) == round(b/norm2) then
      ret["type"] = "scale,rotate"
      table.insert(ret, {type="xyscale",
                         xscale=norm1, yscale=-norm2})
      table.insert(ret,
                   {type="rotate",
                    angle=math.atan2(b/norm2,a/norm1)*180/math.pi})
      return ret
   end

   -- Check rotate then scale
   norm1 = math.sqrt(a^2 + b^2)
   norm2 = math.sqrt(c^2 + d^2)
   if round(a/norm1) == round(d/norm2)
         and round(b/norm1) == round(-c/norm2) then
      ret["type"] = "rotate,scale"
      table.insert(ret, {type="rotate",
                         angle=math.atan2(-b/norm1,a/norm1)*180/math.pi})
      if round(norm1) == round(norm2) then
         table.insert(ret, {type="scale", scale=norm1})
      else
         table.insert(ret, {type="xyscale",
                            xscale=norm1, yscale=norm2})
      end
      return ret

   elseif round(a/norm1) == round(-d/norm2)
         and round(b/norm1) == round(c/norm2) then
      ret["type"] = "rotate,scale"
      table.insert(ret, {type="rotate",
                         angle=math.atan2(-b/norm1,a/norm1)*180/math.pi})
      table.insert(ret, {type="xyscale",
                         xscale=norm1, yscale=-norm2})
      return ret
   end

   -- Not easily decomposable
   ret["type"] = "matrix"
   table.insert(ret, {type="matrix", a=a, b=b, c=c, d=d})
   return ret
end


-- Turn the linear part of a transformation matrix into TikZ transform options.
-- Use rotate and scale if possible; otherwise use a general cm= option.
function matrix_to_options(matrix, options)
   local decomposed = mat_decompose(matrix)
   -- Go backward: inner transformations in TikZ are evaluated first
   for i = #decomposed,1,-1 do
      local tform = decomposed[i]
      if tform.type == "scale" then
         table.insert(options, "scale=" .. sroundang(tform.scale))
      elseif tform.type == "xyscale" then
         if round(tform.xscale) ~= 1 then
            table.insert(options, "xscale=" .. sroundang(tform.xscale))
         end
         if round(tform.yscale) ~= 1 then
            table.insert(options, "yscale=" .. sroundang(tform.yscale))
         end
      elseif tform.type == "rotate" then
         table.insert(options, "rotate=" .. sroundang(tform.angle))
      else
         table.insert(options, "cm={" .. sround(tform.a) .. ","
                         .. sround(tform.c) .. "," .. sround(tform.b)
                         .. "," .. sround(tform.d) .. ",(0,0)}")
      end
   end
end


-- Turns the linear part of a transform matrix into TikZ transform options for
-- an ellipse / arc.  If possible, specify the transformation with (x,y)radius
-- and rotate.  Otherwise use the general cm= option.
function matrix_to_ellipse_options(matrix, options)
   local decomposed = mat_decompose(matrix)

   if #decomposed > 0 and decomposed[1].type == "rotate" then
      -- Rotating a circle just changes the start and end angles (for arcs)
      if options["start angle"] then
         options["start angle"] = options["start angle"] + decomposed[1].angle
      end
      if options["end angle"] then
         options["end angle"] = options["end angle"] + decomposed[1].angle
      end

      table.remove(decomposed, 1)
      if decomposed.type == "rotate" then
         decomposed.type = "identity"
      elseif decomposed.type == "rotate,scale" then
         decomposed.type = "scale"
      end
   end

   if decomposed.type == "identity" then
      options.radius = 1
   elseif decomposed.type == "scale"
        or decomposed.type == "scale,rotate" then
      local tform = decomposed[1]
      if tform.type == "xyscale" then
         options["x radius"] = sround(tform.xscale)
         options["y radius"] = sround(tform.yscale)
         if decomposed.type == "scale,rotate" then
            tform = decomposed[2]
            options["rotate"] = sroundang(tform.angle)
         end
      else
         options["radius"] = sround(tform.scale)
         -- Rotating a circle only changes the start and end angles (for arcs)
         if decomposed.type == "scale,rotate" then
            if options["start angle"] then
               options["start angle"]
                  = options["start angle"] + decomposed[2].angle
            end
            if options["end angle"] then
               options["end angle"]
               = options["end angle"] + decomposed[2].angle
            end
         end
      end
   else -- decomposed.type == "matrix"
      local tform = decomposed[1]
      options["radius"] = 1
      options["cm"]
         = "{" .. sround(tform.a) .. "," .. sround(tform.c)
             .. "," .. sround(tform.b) .. "," .. sround(tform.d) .. ",(0,0)}"
   end

   -- End angle has to be greater than start angle in TikZ; otherwise the arc
   -- goes backwards.
   if options["start angle"] and options["end angle"] then
      while options["end angle"] < options["start angle"] do
         options["end angle"] = options["end angle"] + 360
      end
   end

   if options["start angle"] then
      options["start angle"] = sroundang(options["start angle"])
   end
   if options["end angle"] then
      options["end angle"] = sroundang(options["end angle"])
   end
end


--------------------------------------------------------------------------------
-- Export mark
--------------------------------------------------------------------------------

-- Marks/references are the simplest objects to export.  They translate to TikZ
-- pic's, which are defined in TikZ, not here.  They are unaffected by any
-- transformation matrix.  The attributes stroke/draw and fill are passed to the
-- pic options.  The symbolsize is passed as an option as well, using "ipe mark
-- *" and "ipe mark scale" options, which set the scaling *inside* the pic, and
-- can be overridden (unlike the scale= key, which just updates the current
-- transformation matrix).
--
-- Relevant attributes: stroke, fill, symbolsize, markshape
function export_mark(model, obj, matrix)
   local strocol = obj:get("stroke")
   local fillcol = obj:get("fill")

   local options = { "myTensor" }
   -- The "transformations" attribute has no effect on marks other than
   -- translation
   local pos = matrix*obj:position()

   local markshape = obj:get("markshape")
   local actions, drawing, filling
   _, _, markshape, actions = string.find(markshape, "mark/([^(]+)%(([^)]+)%)")
   markshape = "ipe " .. markshape
   drawing = (string.find(actions, "s") ~= nil)
   filling = (string.find(actions, "f") ~= nil)

   number_option(obj:get("symbolsize"), "ipe mark scale", options, "myTensor-")

   -- draw and fill
   --if drawing then
   --   if strocol ~= "black" then
   --      color_option(obj:get("stroke"), "draw", options, nil, not filling)
   --   end
   --end
   if filling then
       color_option(obj:get("fill"), "fill", options, nil, not drawing)
   end

   if strocol ~= "turquoise" and fillcol ~= "turquoise" then
      write(indent .. "\\node")
      if #options > 0 then
         write("[" .. table.concat(options, ", ") .. "]")
      end
      write("\n" .. indent .. indent_amt)
      write(" at " .. svec(pos) .. " {};\n")
   end
end


--------------------------------------------------------------------------------
-- Export group
--------------------------------------------------------------------------------

-- Group objects translate into TikZ scopes.  Elements in the group are
-- recursively exported, with a larger indentation.  The clipping shape becomes
-- a \clip path.  Group objects do not have style options, so the only options
-- to the scope are transformations.
--
-- Unlike with path objects, the group object's transformation matrix is
-- preserved and set at the beginning of the scope -- I couldn't think of a
-- natural origin in this case.  In particular, translations are not absorbed
-- into the element objects' transformation matrices.
--
-- Relevant attributes: transformations
function export_group(model, obj, matrix)
   local options = {}
   local v = matrix:translation()
   if round(v.x) ~= 0 or round(v.y) ~= 0 then
      table.insert(options, "shift={" .. svec(v) .. "}")
   end
   matrix_to_options(matrix, options)
   write(indent .. "\\begin{scope}")
   if #options > 0 then
      write("[" .. table.concat(options, ", ") .. "]")
   end
   write("\n")

   local old_indent = indent
   indent = indent_amt .. indent

   local clip = obj:clip()
   if clip then
      export_path(clip, "clip", ipe.Matrix())
   end

   for i,element in ipairs(obj:elements()) do
      export_object(model, element, ipe.Vector(0,0))
   end
   indent = old_indent

   write(indent .. "\\end{scope}\n")
end


--------------------------------------------------------------------------------
-- Export text
--------------------------------------------------------------------------------

-- Text objects are exported as \node-s in the "ipe node" style, which should
-- specify a rectangular node with zero inner sep and outer sep, anchored at
-- base west (ipe's default), with the natural width and height.  Minipage text
-- objects are wrapped in a minipage environment with the width specified by the
-- width attribute (which is ignored otherwise).  The horizontal and vertical
-- alignment attributes specify the anchor for the node.
--
-- Relevant attributes: stroke, textsize, opacity, textstyle, minipage, width,
--   horizontalalignment, verticalalignment
function export_text(model, obj, matrix)
   local sheets = model.doc:sheets()
   local text = obj:text()
   local minipage = obj:get("minipage")
   local anchor
   local ha = obj:get("horizontalalignment")
   local va = obj:get("verticalalignment")
   if minipage then ha = "left" end
   if ha == "left" then
      if va == "bottom" then
         anchor = "south west"
      elseif va == "baseline" then
         anchor = "base west"
      elseif va == "vcenter" then
         anchor = "west"
      elseif va == "top" then
         anchor = "north west"
      end
   elseif ha == "hcenter" then
      if va == "bottom" then
         anchor = "south"
      elseif va == "baseline" then
         anchor = "base"
      elseif va == "vcenter" then
         anchor = "center"
      elseif va == "top" then
         anchor = "north"
      end
   elseif ha == "right" then
      if va == "bottom" then
         anchor = "south east"
      elseif va == "baseline" then
         anchor = "base east"
      elseif va == "vcenter" then
         anchor = "east"
      elseif va == "top" then
         anchor = "north east"
      end
   end

   local options = {}

   -- table.insert(options, "ipe node")

   -- Handle coordinate transformations
   local pos = matrix*obj:position()
   -- This attribute is handled differently for text objects
   local trans = obj:get("transformations")
   if trans == "translations" then
      matrix = ipe.Matrix() -- already translated
   elseif trans == "rigid" then
      local x, y = table.unpack(matrix:coeff())
      local angle = ipe.Vector(x, y):angle()
      matrix = ipe.Translation(pos) * ipe.Rotation(angle)
   end
   matrix_to_options(matrix, options)

   -- anchor
   if anchor ~= "base west" then
      table.insert(options, "anchor=" .. anchor)
   end

   -- text size
   local textsizesym = obj:get("textsize")
   local textsize
   local setsize = ""
   local normalstretchnum = sheets:find("textstretch", "normal")
   if textsizesym ~= "normal" then
      if is_number(textsizesym) then
         if minipage then
            -- Need to set font *inside* the minipage
            setsize = string.format(
               "\\fontsize{%s}{%sbp}\\selectfont",
               textsizesym, textsizesym*1.2)
         else
            table.insert(options, "font size pt=" .. textsizesym
                            .. "/" .. (textsizesym*1.2))
         end
         -- In this case, use no text stretch
         if normalstretchnum ~= 1 then
            table.insert(options, "ipe node stretch=1")
            normalstretchnum = 1 -- hack to skip \ipeminipagewidth
         end
      else
         textsize = sheets:find("textsize", textsizesym)
         if minipage then
            -- Need to set font *inside* the minipage
            setsize = textsize
         else
            table.insert(options, "font=" .. textsize)
         end
      end
   end

   -- textstretch
   -- This uses the same key as textsize, if textsize is a symbol.  But we won't
   -- bother adding a scaling factor option unless the textstretch is different
   -- from the normal textstretch (which might be ~= 1)
   local textstretchnum = normalstretchnum
   if not is_number(textsizesym) then
      local res
      res, textstretchnum
         = _G.pcall(function()
               return sheets:find("textstretch", textsizesym) end)
      if not res then
         textstretchnum = normalstretchnum
      end
   end
   if textstretchnum ~= normalstretchnum then
      table.insert(options, "ipe stretch " .. textsizesym)
   end

   -- textstyle
   local textstyle
   local val
   if minipage then
      textstyle = obj:get("textstyle")
      val = sheets:find("textstyle", textstyle)
   else
      local res
      -- 7.2.6 onwards: textstyle for labels is "labelstyle"
      res, textstyle = _G.pcall(function() return obj:get("labelstyle") end)
      if res then
         val = sheets:find("labelstyle", textstyle)
      else
         textstyle = obj:get("textstyle")
         val = sheets:find("textstyle", textstyle)
      end
   end
   -- val is a \0-separated pair of strings
   local beginstr, endstr
   _, _, beginstr, endstr = string.find(val, "^(.*)\0(.*)$")
   if beginstr ~= "" or endstr ~= "" then
      if minipage then
         text = beginstr .. "\n" .. text .. "\n" .. endstr
      else
         text = beginstr .. text .. endstr
      end
   end

   -- color
   if obj:get("stroke") ~= "black" then
      color_option(obj:get("stroke"), "text", options)
   end

   -- opacity is always a symbolic name in ipe
   local opacity = obj:get("opacity")
   local prepend = nil
   opacity = string.gsub(opacity, "%%", "") -- strip %
   if opacity ~= "opaque" then
      string_option(opacity, nil, options, prepend)
   end

   write(indent .. "\\node")
   if #options > 0 then
      write("[" .. table.concat(options, ", ") .. "]")
   end
   write("\n" .. indent .. indent_amt .. " at " .. svec(pos, 3) .. " ")

   if minipage then
      -- Add minipage environment, and indent everything.  The indentation looks
      -- nice, but it'll mess up a verbatim environment or something.  Oh well.
      local old_indent = indent
      indent = indent .. indent_amt .. indent_amt .. " "
      write("{\n")
      -- The \kern0pt is to cancel out \ignorespaces in the \begin{minipage},
      -- which seems to be what happens when ipe runs LaTeX.
      if textstretchnum ~= 1 then
         write(indent .. string.format(
                  "\\ipestretchwidth{%sbp}\n", sround(obj:get("width"))))
         write(indent .. "\\begin{minipage}{\\ipeminipagewidth}"
                  .. setsize .. "\\kern0pt\n")
      else
         write(indent .. "\\begin{minipage}{"
                  .. sround(obj:get("width")) .. "bp}"
                  .. setsize .. "\\kern0pt\n")
      end
      string.gsub(text .. "\n", "([^\n]*)\n",
                  function (c) write(indent .. indent_amt .. c .. "\n") end)
      write(indent .. "\\end{minipage}\n")
      indent = old_indent
      write(indent .. indent_amt .. " }")
   else
      write("{" .. text .. "}")
   end

   write(";\n")
end

--------------------------------------------------------------------------------
-- Export paths
--------------------------------------------------------------------------------

function export_curve(subpath, matrix, options)
   local ret = ""
   local translate_origin = not is_almost_identity(matrix)
   local first_point

   -- Recognize rectangles
   if #subpath == 3 and subpath.closed
      and subpath[1].type == "segment"
      and subpath[2].type == "segment"
      and subpath[3].type == "segment"
   then
      local pt1 = subpath[1][1]
      local pt2 = subpath[1][2]
      local pt3 = subpath[2][2]
      local pt4 = subpath[3][2]
      if (round(pt1.x) == round(pt2.x)
             and round(pt1.y) == round(pt4.y)
             and round(pt3.y) == round(pt2.y)
             and round(pt3.x) == round(pt4.x)) or
         (round(pt1.x) == round(pt4.x)
             and round(pt1.y) == round(pt2.y)
             and round(pt3.y) == round(pt4.y)
             and round(pt3.x) == round(pt2.x))
      then -- It's a rectangle
         first_point = matrix*pt1
         if translate_origin then
            matrix = ipe.Translation(-pt1)
            ret = ret .. "\n" .. indent .. "(0, 0)"
         else
            ret = ret .. "\n" .. indent .. svec(matrix*pt1)
         end
         ret = ret .. " rectangle " .. svec(matrix*pt3)
         subpath = {}
      end
   end

   for i,segment in ipairs(subpath) do
      if segment.type == "segment" then
         if i == 1 then
            first_point = matrix*segment[1]
            if translate_origin then
               matrix = ipe.Translation(-segment[1])
               ret = ret .. "\n" .. indent .. "(0, 0)"
            else
               ret = ret .. "\n" .. indent .. svec(matrix*segment[1])
            end
         end
         ret = ret .. "\n" .. indent .. " -- " .. svec(matrix*segment[2])

      elseif segment.type == "spline" or
           segment.type == "oldspline" then
         -- TikZ doesn't know from uniform cubic B-splines, so convert to
         -- regular splines first.  (This is what happens internally in ipe
         -- before converting to PDF.)
         local beziers = ipe.splineToBeziers(
            segment, false, segment.type == "oldspline")
         for j,bezier in ipairs(beziers) do
            if i == 1 and j == 1 then
               first_point = matrix*bezier[1]
               if translate_origin then
                  matrix = ipe.Translation(-bezier[1])
                  ret = ret .. "\n" .. indent .. "(0, 0)"
               else
                  ret = ret .. "\n" .. indent .. svec(matrix*bezier[1])
               end
            end
            ret = ret .. "\n" .. indent .. " .. controls "
               .. svec(matrix*bezier[2])
               .. " and " .. svec(matrix*bezier[3])
               .. " .. " .. svec(matrix*bezier[4])
         end

      elseif segment.type == "arc" then
         -- An arc in ipe is specified by an ellipse, which is defined by a
         -- transformation matrix applied to the unit circle, and a start/end
         -- angle, which are applied to the unit circle, before transformation.
         -- This code extracts the rotation and scale components of the
         -- transformation (if possible), and uses them to set the "x radius"
         -- and "y radius" options of the arc.
         local arc_options = {}
         local alpha, beta = segment.arc:angles()
         arc_options["start angle"] = alpha*180/math.pi
         arc_options["end angle"] = beta*180/math.pi
         local arc_matrix = segment.arc:matrix()
         local beginp, endp = segment.arc:endpoints()
         if i == 1 then
            first_point = matrix*beginp
            if translate_origin then
               matrix = ipe.Translation(-beginp)
               ret = ret .. "\n" .. indent .. "(0, 0)"
            else
               ret = ret .. "\n" .. indent .. svec(matrix*beginp)
            end
         end

         matrix_to_ellipse_options(arc_matrix, arc_options)

         subpath_options = concat_pairs(arc_options, ", ", {"rotate", "cm"})
         ret = ret .. "\n" .. indent
         if subpath_options ~= "" then
            ret = ret .. " { [" .. subpath_options .. "]"
         end
         ret = ret .. " arc[" ..
            concat_pairs(arc_options, ", ",
                         {"start angle", "end angle", "x radius",
                          "y radius", "radius"}) .. "]"
         if subpath_options ~= "" then
            ret = ret .. " }"
         end
      end
   end

   if subpath.closed then
      -- Use "--" (path-to) in all cases: for arcs and splines, the end point is
      -- on top of the first point anyway.
      ret = ret .. "\n" .. indent .. " -- cycle"
   end

   if translate_origin then
      table.insert(options, 1, "shift={" .. svec(first_point,3) .. "}")
   end

   return ret, matrix
end


function export_ellipse(subpath, matrix, options)
   local ret = ""
   local translate_origin = not is_almost_identity(matrix)
   local ellipse_matrix = subpath[1]

   local first_point = matrix*ellipse_matrix:translation()
   if translate_origin then
      matrix = ipe.Translation(-ellipse_matrix:translation())
      ret = ret .. "\n" .. indent .. "(0, 0)"
      table.insert(options, 1, "shift={" .. svec(first_point,3) .. "}")
   else
      ret = ret .. "\n" .. indent .. svec(first_point)
   end

   local ellipse_options = {}
   matrix_to_ellipse_options(ellipse_matrix, ellipse_options)

   local op_type
   if ellipse_options.radius then
      op_type = "circle"
   else
      op_type = "ellipse"
   end
   ret = ret .. " " .. op_type .. "["
      .. concat_pairs(ellipse_options, ", ",
                      {"x radius", "y radius", "radius", "rotate", "cm"})
      .. "]"

   return ret, matrix
end


function export_closedspline(subpath, matrix, options)
   local ret = ""
   local translate_origin = not is_almost_identity(matrix)
   -- TikZ doesn't know from uniform cubic B-splines, so convert to
   -- regular splines first.  (This is what happens internally in ipe
   -- before converting to PDF.)
   local beziers = ipe.splineToBeziers(subpath, true)

   for i,bezier in ipairs(beziers) do
      if i == 1 then
         first_point = matrix*bezier[1]
         if translate_origin then
            matrix = ipe.Translation(-bezier[1])
            ret = ret .. "\n" .. indent .. "(0, 0)"
         else
            ret = ret .. "\n" .. indent .. svec(matrix*bezier[1])
         end
      end
      ret = ret .. "\n" .. indent .. " .. controls "
         .. svec(matrix*bezier[2])
         .. " and " .. svec(matrix*bezier[3])
         .. " .. "
      if i == #beziers then
         ret = ret .. "cycle"
      else
         ret = ret .. svec(matrix*bezier[4])
      end
   end

   if translate_origin then
      table.insert(options, 1, "shift={" .. svec(first_point,3) .. "}")
   end

   return ret, matrix
end


-- A path consists of a number of subpaths.  A path translates into a single
-- TikZ \path statement (actually \draw, \fill, \filldraw, or \clip).  Each
-- subpath is a connected path; subpaths are composed by using move-to
-- operations in TikZ (i.e., empty path operations).
--
-- Since this exporter is meant to produce readable TikZ code, special care is
-- taken with transformation matrices.  These include the top-level
-- transformation matrix M, which applies to the entire path, and a matrix A for
-- an arc or an ellipse, which transforms the unit circle onto that (arc on an)
-- ellipse.  These are translated to TikZ as follows.
--
--  * If M is just a translation, all translations are absorbed into the
--    coordinates in the path.  This way we don't produce dumb things like
--       \path[shift={(a,b)}] ...
--
--  * If M has a nontrivial linear part, then we try to decompose it into a
--    rotation and (x,y)scale; otherwise we just pass a cm=... option to the
--    path.
--
--    - The translation component of M often doesn't make much sense--an object
--      may have been defined at one place, then moved, then rotated, but we
--      don't care where it was originally moved from.  We make the following
--      compromise: the first coordinate in the path is taken as the origin of
--      the entire path; all other coordinates encountered in the path are
--      translated relative to that.  Then the shift part of the TikZ options
--      translate that origin to where it's supposed to go.
--
--    - In the (common) case that the path is a single ellipse, we pass the
--      transformation options to the ellipse itself, where they can be passed
--      using "x radius" and "y radius".
--
--  * As for arc/ellipse matrices: these are also decomposed into scale and
--    rotation, if possible.  Scale is passed as "x radius" and "y radius", and
--    rotation (or the general cm) is passed to an option of a subpath
--    containing only the arc, or directly to the ellipse, which can take its
--    own transformation options.
--
--    The translation component of an arc is ignored, since the first point on
--    the arc is specified; the translation of an ellipse is used for the
--    move-to operation.
--
-- Relevant attributes:
--   pen stroke fill linejoin linecap fillrule
--   dashstyle opacity tiling
--   farrow rarrow farrowsize rarrowsize farrowshape rarrowshape
--   transformations pathmode
-- Not implemented: gradient

function export_path(shape, mode, matrix, obj)
   local orig_matrix = matrix
   local options = {}

   local path_str = ""
   local old_indent = indent
   indent = indent .. indent_amt
   for i,subpath in ipairs(shape) do
      -- Each export_* function takes the subpath, transformation matrix, and
      -- path options.  If the matrix is a translation, it is returned
      -- untouched, and the options are not modified; the matrix is simply
      -- applied to all coordinates in that subpath.  If the matrix is more
      -- complicated, it is applied to the first coordinate of the path, and a
      -- "shift=(the new coordinate)" option is added to the options.  The
      -- returned matrix is the translation from the original first coordinate
      -- to the origin.  This way, the first coordinate of the entire path
      -- becomes the origin of the path, and all other coordinates are
      -- translated accordingly, unless the matrix itself is a translation, in
      -- which case it is absorbed into the path coordinates.
      if subpath.type == "curve" then
         if #shape == 1 and #subpath == 1 and subpath[1].type == "arc" then
            -- arc-only subpath; treat like ellipse and move the transformation
            -- into the arc options
            local arc = subpath[1].arc
            local alpha, beta = arc:angles()
            subpath[1].arc = ipe.Arc(matrix * arc:matrix(), alpha, beta)
            matrix = ipe.Matrix()
            orig_matrix = matrix
         end
         subpath_str, matrix = export_curve(subpath, matrix, options)
      elseif subpath.type == "ellipse" then
         if #shape == 1 then
            -- Move the path transformation into the ellipse options
            subpath[1] = matrix * subpath[1]
            matrix = ipe.Matrix()
            orig_matrix = matrix
         end
         subpath_str, matrix = export_ellipse(subpath, matrix, options)
      elseif subpath.type == "closedspline" then
         subpath_str, matrix = export_closedspline(subpath, matrix, options)
      end
      path_str = path_str .. subpath_str
   end

   -- Do transformations (linear part of the matrix).  This must come *after*
   -- the shift options, since it should be applied before the shift.
   matrix_to_options(orig_matrix, options)

   -- Set the path mode(s)
   local drawing = nil
   local filling = nil
   local clipping = nil
   local strocol = obj:get("stroke")

   if mode == "stroked" then
      drawing = true
   elseif mode == "strokedfilled" then
      drawing = true
      filling = true
   elseif mode == "filled" then
      filling = true
   elseif mode == "clip" then
      clipping = true
   end

   -- If obj is passed then (drawing or filling) is true and clipping is false.
   if obj then
      local color_done = nil
      -- Special case: \filldraw with same draw and fill colors
      if drawing and filling and obj:get("tiling") == "normal" then
         if obj:get("stroke") == obj:get("fill") then
            color_option(obj:get("stroke"), "color", options, nil, true)
            color_done = true
         end
      end

      if drawing then
         -- stroke color
         -- "default" stroke is black
         -- need draw= if filling
         -- if strocol ~= "black" and not color_done then
         --    color_option(obj:get("stroke"), "draw", options, nil, not filling)
         -- end
         -- need draw= if filling
      	 if strocol == "darkorange" then
           color_option("virtual", "draw", options, nil, not filling)
         elseif strocol == "orange" then
            color_option("virtual", "draw", options, nil, not filling)
         elseif strocol == "red" then
            color_option("virtual", "draw", options, nil, not filling)
         elseif strocol ~= "black" then
            color_option(strocol, "draw", options, nil, not filling)
         end

         -- pen / line width
         local prepend
         prepend = nil
         number_option(obj:get("pen"), "line width", options, prepend)

         -- only symbolic dash styles are supported
         prepend = nil
         string_option(obj:get("dashstyle"), nil, options, prepend)

         -- line join: these have the same names in ipe and TikZ
         string_option(obj:get("linejoin"), "line join", options)

         -- line cap
         local translate_caps = {
            round="round", square="rect", butt="butt" }
         string_option(translate_caps[obj:get("linecap")], "line cap", options)

         -- arrows
         local farrow = nil
         local rarrow = nil
         if obj:get("farrow") then
            farrow = arrow_spec(
               obj:get("farrowshape"), obj:get("farrowsize"), true)
         end
         if obj:get("rarrow") then
            rarrow = arrow_spec(
               obj:get("rarrowshape"), obj:get("rarrowsize"), nil)
         end
         if farrow or rarrow then
            table.insert(options, (rarrow or "") .. "-" .. (farrow or ""))
         end
      end

      if filling then
         if obj:get("tiling") ~= "normal" then
            -- tiling patterns: symbolic only
            string_option(obj:get("tiling"), "pattern", options)
            color_option(obj:get("fill"), "pattern color", options)
         else
            if not color_done then
               color_option(obj:get("fill"), "fill", options, nil, not drawing)
            end
         end

         -- fill rule
         local translate_fillrule = {
            wind="nonzero rule", evenodd="even odd rule" }
         string_option(translate_fillrule[obj:get("fillrule")], nil, options)
      end

      -- opacity is always a symbolic name in ipe
      local opacity = obj:get("opacity")
      local prepend = nil
      opacity = string.gsub(opacity, "%%", "") -- strip %
      if opacity ~= "opaque" then
         string_option(opacity, nil, options, prepend)
      end
   end

   if strocol ~= "turquoise" then
      
      indent = old_indent
      write(indent)
      if drawing and filling then
         write("\\filldraw")
      elseif drawing then
         write("\\draw")
      elseif filling then
         write("\\fill")
      elseif clipping then
         write("\\clip")
      end
      
      if #options > 0 then
         write("[" .. table.concat(options, ", ") .. "]")
      end
      
      write(path_str .. ";\n")
   end
end


--------------------------------------------------------------------------------
-- Export object
--------------------------------------------------------------------------------

-- origin is a transformation to apply after all others.
function export_object(model, obj, origin)
   -- The object's properties can specify that only the translation part of
   -- the matrix should apply, or only the "rigid part".  Do that now.
   local matrix = obj:matrix()
   if obj:type() ~= "text" and obj:type() ~= "reference" then
      -- this attribute is handled differently by text and reference objects
      local trans = obj:get("transformations")
      if trans == "translations" then
         matrix = ipe.Translation(matrix:translation())
      elseif trans == "rigid" then
         -- "rigid part" just means rotate so that (1,0) points in the direction
         -- of matrix*(1,0)
         local x, y = table.unpack(matrix:coeff())
         local angle = ipe.Vector(x, y):angle()
         matrix = ipe.Translation(matrix:translation()) * ipe.Rotation(angle)
      end
   end

   matrix = ipe.Translation(-origin) * matrix

   if obj:type() == "path" then
      export_path(obj:shape(), obj:get("pathmode"), matrix, obj)
   elseif obj:type() == "text" then
      export_text(model, obj, matrix)
   elseif obj:type() == "group" then
      export_group(model, obj, matrix)
   elseif obj:type() == "reference" then
      export_mark(model, obj, matrix)
   else
      print("Exporting objects of type " .. obj:type() .. " is not supported.")
   end
end


--------------------------------------------------------------------------------
-- Main exporting functions
--------------------------------------------------------------------------------

-- Create a text label containing "text", and insert "preamble" into the
-- preamble.
function create_text_obj(model, origin, text, preamble)
   local t = { label = "TikZ export to text object",
               pno = model.pno,
               vno = model.vno,
               selection = model:selection(),
               original = model:page():clone(),
               sheets = model.doc:sheets():clone(),
               text = text,
               preamble = preamble,
               model = model }

   t.redo = function(t, doc)
      local page = doc[t.pno]

      -- Move all the old objects to another layer
      local old_layer = "_TikZ_replaced"
      if not _G.indexOf(old_layer, page:layers()) then
         page:addLayer(old_layer)
         for i = 1,page:countViews(),1 do
            page:setVisible(i, old_layer, false)
         end
      end
      for _,obj in pairs(t.selection) do
         page:setLayerOf(obj, old_layer)
      end
      page:deselectAll()

      -- Update the preamble
      local preamble = "\n"
         .. "% The following is auto-generated by the TikZ exporter.\n"
         .. t.preamble
      -- Put the preamble in its own stylesheet (creating it if it doesn't
      -- exist)
      local sheets = doc:sheets()
      local sheet
      for i = 1,sheets:count(),1 do
         local s = sheets:sheet(i)
         if s:name() == "TikZ-export" then
            sheet = s
            break
         end
      end
      if not sheet then -- add the stylesheet
         sheet = ipe.Sheet()
         sheet:setName("TikZ-export")
         sheets:insert(1, sheet)
      end
      sheet:set("preamble", preamble)
      -- Add a style to make sure the scaling factor is 1 (scaling happens in
      -- TikZ already)
      -- The following line doesn't work, probably due to an Ipe bug.  But it
      -- shouldn't really be necessary
      -- sheet:add("textsize", "TikZ-normal", "\\normalsize")
      sheet:add("textstretch", "TikZ-normal", 1)

      -- Add the new TikZ text object
      local obj = ipe.Text({textsize="TikZ-normal"}, t.text, origin)
      local layer = page:active(t.vno)
      page:insert(nil, obj, 1, layer)

      -- t.model:autoRunLatex()
   end

   t.undo = function(t, doc)
      _G.revertOriginal(t, doc)
      doc:replaceSheets(t.sheets)
   end
   model:register(t)

end


-- Run the export to text dialog
function run_text_dialog(model)
   params.fulldoc = false
   params.stylesheets = false
   params.colors = false
   params.scopeonly = false
   params.drawgrid = false
   params.filename = nil

   return true
end


-- Configuration parameters from export dialogs
params_text = {
   fulldoc=false,
   stylesheets=false,
   colors=false,
   scopeonly=false,
   drawgrid=false,
   filename=nil
}

params = {}

function run(model, num)
   local do_text = (num == 1)

   local page = model:page()
   local sheets = model.doc:sheets()

   -- indentation (global)
   indent = ""

   -- Run the parameters dialog
   if do_text then
      params = params_text
      if #model:selection() == 0 then
         ipeui.messageBox(
            model.ui:win(), "warning", "TikZ export error",
            "Please select some objects to convert to "
               .. "a TikZ text object", "ok")
         return
      end
   end

   -- Open files, setup write function(s)
   local f, e, text_contents, preamble_contents, write_text, write_preamble
   if do_text then
      text_contents = ""
      write_text = function(arg) text_contents = text_contents .. arg end
      preamble_contents = ""
      write_preamble = function(arg)
         preamble_contents = preamble_contents .. arg end
      write = write_text
   end

   -- TikZ environment
   local envname = "tikzpicture"
   if params.scopeonly then envname = "scope" end
   write("\\begin{" .. envname .. "}")
   local options = {}
   if do_text then
      table.insert(options, "scale=1")
   end
   write("[" .. table.concat(options, ", ") .. "]\n")
   indent = indent_amt

   -- In full document mode, set the bounding box beforehand to reflect the page
   -- size.
   if params.fulldoc then
      write(indent .. string.format(
               "\\useasboundingbox %s rectangle %s;\n",
               svec(-layout.origin), svec(layout.papersize - layout.origin)))
   end

   -- Decide on an origin for TikZ
   local origin = ipe.Vector(0,0)
   if do_text then
      -- Use the coordinate system origin if it's set; otherwise use the
      -- bottom-left corner of the bounding box
      if model.snap.with_axes then
         origin = model.snap.origin
      else
         local box = bounding_box(model)
         origin = box:bottomLeft()
      end
   end

   for i, obj, sel, layer in page:objects() do
      -- Only export objects that appear in the current view
      if page:visible(model.vno, i) then
         -- In do_text mode, only export selected objects
         if do_file or (do_text and sel) then
            export_object(model, obj, origin)
         end
      end
   end
   write("\\end{" .. envname .. "}\n")

   if do_text then
      create_text_obj(model, origin, text_contents, preamble_contents)
   end
end
