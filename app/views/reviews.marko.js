function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa,
      attrs = __helpers.as,
      attr = __helpers.a;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"en\"><head><title>" +
      escapeXml(data.bookname) +
      "</title><link href=\"/css/star.css\" rel=\"stylesheet\"><link href=\"/css/style.css\" rel=\"stylesheet\"><link href=\"/css/sticky.css\" rel=\"stylesheet\"><link href=\"/css/font-awesome.min.css\" rel=\"stylesheet\"><script src=\"/bower_components/jquery/jquery.js\" type=\"text/javascript\"></script><script src=\"/bower_components/jquery/jquery.min.js\" type=\"text/javascript\"></script><script src=\"/js/ratingaction.js\" type=\"text/javascript\"></script></head><body>");

    if (data.err === 0) {
      forEach(data.data, function(book) {
        out.w("<h1><b><i>Reviews for " +
          escapeXml(book.title) +
          "</i></b></h1>");
      });

      out.w("<br>");

      if (data.data[0].reviews.length > 0) {
        out.w("<h1> Reviews :</h1><table><thead> <th> Name </th><th> Review </th><th> Rating (1 - 5) </th><th> Date </th></thead>");

        forEach(data.data, function(book) {
          forEach(book.reviews, function(review) {
            out.w("<tr><td> " +
              escapeXml(review.name) +
              " </td><td> " +
              escapeXml(review.review) +
              " </td><td> <div class=\"cont\"><div class=\"stars\" style><form action><input disabled class=\"star2 star-5  " +
              escapeXmlAttr(review.is1Checked) +
              "\" id=\"star-5-2-" +
              escapeXmlAttr(review.srno) +
              "\" name=\"star\" type=\"radio\"><label disabled class=\"star2 star-5 " +
              escapeXmlAttr(review.is1Checked) +
              "\" for=\"star-5-2-" +
              escapeXmlAttr(review.srno) +
              "\"> </label><input disabled class=\"star2 star-4 " +
              escapeXmlAttr(review.is2Checked) +
              "\" id=\"star-4-2-" +
              escapeXmlAttr(review.srno) +
              "\" name=\"star\" type=\"radio\"><label disabled class=\"star2 star-4 " +
              escapeXmlAttr(review.is2Checked) +
              "\" for=\"star-4-2-" +
              escapeXmlAttr(review.srno) +
              "\"></label><input disabled class=\"star2 star-3 " +
              escapeXmlAttr(review.is3Checked) +
              "\" id=\"star-3-2-" +
              escapeXmlAttr(review.srno) +
              "\" name=\"star\" type=\"radio\"" +
              attrs(book.is3Checked) +
              "><label disabled class=\"star2 star-3 " +
              escapeXmlAttr(review.is3Checked) +
              "\" for=\"star-3-2-" +
              escapeXmlAttr(review.srno) +
              "\"" +
              attrs(book.is3Checked) +
              "></label><input disabled class=\"star2 star-2 " +
              escapeXmlAttr(review.is4Checked) +
              "\" id=\"star-2-2-" +
              escapeXmlAttr(review.srno) +
              "\" name=\"star\" type=\"radio\"" +
              attrs(book.is4Checked) +
              "><label disabled class=\"star2 star-2 " +
              escapeXmlAttr(review.is4Checked) +
              "\" for=\"star-2-2-" +
              escapeXmlAttr(review.srno) +
              "\"" +
              attrs(book.is4Checked) +
              "></label><input disabled class=\"star2 star-1 " +
              escapeXmlAttr(review.is5Checked) +
              "\" id=\"star-1-2-" +
              escapeXmlAttr(review.srno) +
              "\" name=\"star\" type=\"radio\"" +
              attrs(book.is5Checked) +
              "><label disabled class=\"star2 star-1 " +
              escapeXmlAttr(review.is5Checked) +
              "\" for=\"star-1-2-" +
              escapeXmlAttr(review.srno) +
              "\"" +
              attrs(book.is5Checked) +
              "></label></form></div></div> </td><td> " +
              escapeXml(new Date(review.date).toDateString()) +
              " </td></tr>");
          });
        });

        out.w("</table>");
      } else {
        out.w("<h1>No reviews added yet.</h1>");
      }
    } else {
      out.w("<div>" +
        escapeXml(data.data) +
        "</div>");
    }

    out.w("<br><br><p>Have you read this book ?</p><h1>Write a review</h1><form method=\"post\"><table><tr><td> Name : </td><td> <input type=\"text\" name=\"name\"> </td></tr><tr><td> Review : </td><td> <input type=\"text\" name=\"review\"> </td></tr><tr><td> Rating : </td><td> <div class=\"cont\"><div class=\"stars\"><form action><input class=\"star star-5\" id=\"star-5-2\" data=\"5\" onclick=\"handleRatingChange(this)\" name=\"star\" type=\"radio\"><label class=\"star star-5\" for=\"star-5-2\" data=\"5\" onclick=\"handleRatingChange(this)\"></label><input class=\"star star-4\" id=\"star-4-2\" data=\"4\" onclick=\"handleRatingChange(this)\" name=\"star\" type=\"radio\"><label class=\"star star-4\" for=\"star-4-2\" data=\"4\" onclick=\"handleRatingChange(this)\"></label><input class=\"star star-3\" id=\"star-3-2\" data=\"3\" onclick=\"handleRatingChange(this)\" name=\"star\" type=\"radio\"><label class=\"star star-3\" for=\"star-3-2\" data=\"3\" onclick=\"handleRatingChange(this)\"></label><input class=\"star star-2\" id=\"star-2-2\" data=\"2\" onclick=\"handleRatingChange(this)\" name=\"star\" type=\"radio\"><label class=\"star star-2\" for=\"star-2-2\" data=\"2\" onclick=\"handleRatingChange(this)\"></label><input class=\"star star-1\" id=\"star-1-2\" data=\"1\" onclick=\"handleRatingChange(this)\" name=\"star\" type=\"radio\"><label class=\"star star-1\" for=\"star-1-2\" data=\"1\" onclick=\"handleRatingChange(this)\"></label></form></div></div></td></tr><tr> <td><input type=\"submit\" name=\"Submit\"><input type=\"hidden\" id=\"rating\" name=\"rating\" value=\"0\"><input type=\"hidden\" name=\"bid\"" +
      attr("value", data.data[0]._id) +
      "> </td> </tr></table></form><br><a href=\"/books\"> Go to book list </a>");

    if (notEmpty(data.msg)) {
      out.w("<h1" +
        attrs(data.msg) +
        "></h1>");
    }

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
