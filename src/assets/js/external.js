// ===========================
$(".choose-brand").click(function () {
	$(".choose-brand label").addClass("active-hover");
	$(".choose-influencer label").removeClass("active-hover");
	$(".social-show").slideUp(300);
});
$(".choose-influencer").click(function () {
	$(".choose-influencer label").addClass("active-hover");
	$(".choose-brand label").removeClass("active-hover");
	$(".social-show").slideDown(300);
});
$(".brand-id").click(function () {
	$(".brand-id label").addClass("active-hover");
	$(".influence-id label").removeClass("active-hover");
	$(".brand-orgnization").slideDown(300);
	$(".influence_user").slideUp(300);
});
$(".brand-orgnization form button").click(function () {
	$(".brand-under-orgnization").slideDown(300);
});
$(".influence-id").click(function () {
	$(".influence-id label").addClass("active-hover");
	$(".brand-id label").removeClass("active-hover");
	$(".influence_user").slideDown(300);
	$(".brand-orgnization").slideUp(300);
	$(".brand-under-orgnization").slideUp(300);
});
$("#companysurveymodal .close").click(function () {
	alert();
	$("#companysurveymodal").addClass('modal-hide');
});
// ===========================
function pageRedirect() {
	window.location.replace("verify_account.html");
}
// ===========================

