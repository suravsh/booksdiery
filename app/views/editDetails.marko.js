function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      attr = __helpers.a,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"en\"><head><title>Edit book details.</title><link href=\"/css/style.css\" rel=\"stylesheet\"><script src=\"components/jquery/jquery.js\" type=\"text/javascript\"></script><script src=\"components/jquery/jquery.min.js\" type=\"text/javascript\"></script><script src=\"/js/formaction.js\" type=\"text/javascript\"></script></head><body>");

    if (data.err === 0) {
      forEach(data.data, function(book) {
        out.w("<table><tr> <td><h1> Edit details of " +
          escapeXml(book.title) +
          " </h1><br><table><tr><td> Book title : </td><td> <input form=\"edit\" type=\"text\" id=\"title\"" +
          attr("value", book.title) +
          "> </td></tr><tr><td> Author : </td><td> <input form=\"edit\" type=\"text\" id=\"author\"" +
          attr("value", book.author) +
          "> </td></tr><tr><td> ISBN : </td><td> <input form=\"edit\" type=\"text\" id=\"isbn\" value=\"" +
          escapeXmlAttr(book.isbn) +
          " \"> </td></tr><tr><td> Price : </td><td> <input form=\"edit\" type=\"text\" id=\"price\"" +
          attr("value", book.price) +
          "> </td></tr><tr> <td><input form=\"edit\" type=\"submit\" name=\"Submit\" onclick=\"handleUpdateAction(this)\"><input form=\"edit\" type=\"hidden\" id=\"bid\"" +
          attr("value", book._id) +
          "></td></tr></table><br><table><tr><td>Delete this book : </td><td><input form=\"delete\" type=\"submit\" id=\"Submit\" value=\"Delete Now\" onclick=\"handleDeleteAction(this)\"><input form=\"delete\" type=\"hidden\" id=\"bid\"" +
          attr("value", book._id) +
          "> </td></tr></table></td></tr></table>");
      });

      out.w("<br><a href=\"/books\"> Go to book list </a>");
    } else {
      out.w("<div>" +
        escapeXml(data.data) +
        "</div>");
    }

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
