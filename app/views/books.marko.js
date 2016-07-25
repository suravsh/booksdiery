function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa,
      attrs = __helpers.as;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"en\"><head><title>List of books.</title><link href=\"css/style.css\" rel=\"stylesheet\"><link href=\"css/star.css\" rel=\"stylesheet\"><link href=\"css/sticky.css\" rel=\"stylesheet\"><link href=\"css/font-awesome.min.css\" rel=\"stylesheet\"><script src=\"components/jquery/jquery.js\" type=\"text/javascript\"></script><script src=\"components/jquery/jquery.min.js\" type=\"text/javascript\"></script><script src=\"/js/formaction.js\" type=\"text/javascript\"></script></head><body>");

    if (data.err === 0) {
      out.w("<h1> List of books. </h1><br><table><thead> <th> Book Title </th><th> Author </th><th> Retail Price </th><th> ISBN </th><th> Rating </th><th> Reviews </th><th> Date </th></thead>");

      forEach(data.data, function(book) {
        out.w("<tr><td title=\"Click to edit\"> <a href=\"editDetails?bid=" +
          escapeXmlAttr(book._id) +
          "\"> " +
          escapeXml(book.title) +
          " </a></td><td> " +
          escapeXml(book.author) +
          " </td><td> " +
          escapeXml(book.price) +
          " </td><td> " +
          escapeXml(book.isbn) +
          " </td><td><div class=\"cont\"><div class=\"stars\" style><form action><input disabled class=\"star2 star-5  " +
          escapeXmlAttr(book.is1Checked) +
          "\" id=\"star-5-2-" +
          escapeXmlAttr(book.srno) +
          "\" name=\"star\" type=\"radio\"><label disabled class=\"star2 star-5 " +
          escapeXmlAttr(book.is1Checked) +
          "\" for=\"star-5-2-" +
          escapeXmlAttr(book.srno) +
          "\"> </label><input disabled class=\"star2 star-4 " +
          escapeXmlAttr(book.is2Checked) +
          "\" id=\"star-4-2-" +
          escapeXmlAttr(book.srno) +
          "\" name=\"star\" type=\"radio\"><label disabled class=\"star2 star-4 " +
          escapeXmlAttr(book.is2Checked) +
          "\" for=\"star-4-2-" +
          escapeXmlAttr(book.srno) +
          "\"></label><input disabled class=\"star2 star-3 " +
          escapeXmlAttr(book.is3Checked) +
          "\" id=\"star-3-2-" +
          escapeXmlAttr(book.srno) +
          "\" name=\"star\" type=\"radio\"" +
          attrs(book.is3Checked) +
          "><label disabled class=\"star2 star-3 " +
          escapeXmlAttr(book.is3Checked) +
          "\" for=\"star-3-2-" +
          escapeXmlAttr(book.srno) +
          "\"" +
          attrs(book.is3Checked) +
          "></label><input disabled class=\"star2 star-2 " +
          escapeXmlAttr(book.is4Checked) +
          "\" id=\"star-2-2-" +
          escapeXmlAttr(book.srno) +
          "\" name=\"star\" type=\"radio\"" +
          attrs(book.is4Checked) +
          "><label disabled class=\"star2 star-2 " +
          escapeXmlAttr(book.is4Checked) +
          "\" for=\"star-2-2-" +
          escapeXmlAttr(book.srno) +
          "\"" +
          attrs(book.is4Checked) +
          "></label><input disabled class=\"star2 star-1 " +
          escapeXmlAttr(book.is5Checked) +
          "\" id=\"star-1-2-" +
          escapeXmlAttr(book.srno) +
          "\" name=\"star\" type=\"radio\"" +
          attrs(book.is5Checked) +
          "><label disabled class=\"star2 star-1 " +
          escapeXmlAttr(book.is5Checked) +
          "\" for=\"star-1-2-" +
          escapeXmlAttr(book.srno) +
          "\"" +
          attrs(book.is5Checked) +
          "></label></form></div></div> </td><td> <a href=\"/reviews/?bid=" +
          escapeXmlAttr(book._id) +
          "\">Check reviews</a> </td><td> " +
          escapeXml(new Date(book.date).toDateString()) +
          " </td></tr>");
      });

      if (data.data[0] && (data.data[0].issearch === true)) {
        out.w("<br><a href=\"/books\"> Clear search and show all book list </a><br>");
      }

      out.w("</table>");
    } else {
      out.w("<div>" +
        escapeXml(data.data) +
        "</div>");
    }

    out.w("<br><table> <tr> <td><h1> Add new book </h1><br><table><tr><td> Book title : </td><td> <input type=\"text\" id=\"title\"> </td></tr><tr><td> Author : </td><td> <input type=\"text\" id=\"author\"> </td></tr><tr><td> ISBN : </td><td> <input type=\"text\" id=\"isbn\"> </td></tr><tr><td> Price : </td><td> <input type=\"text\" id=\"price\"> </td></tr><tr> <td><input onclick=\"handlePostAction(this)\" type=\"submit\" name=\"Submit\"></td> </tr></table><br></td> </tr> <tr><td><h1> Search Book </h1><br><form method=\"get\"><table><tr><td> Query: </td><td> <input type=\"text\" name=\"query\" placeholder=\"Title | Author | ISBN\"> </td></tr><tr> <td><input type=\"submit\" value=\"Seach\"></td> </tr></table></form></td></tr></table>");

    if (notEmpty(data.msg)) {
      out.w("<h1" +
        attrs(data.msg) +
        "></h1>");
    }

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
