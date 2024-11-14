// THIS FILE IS AUTO-GENERATED. DO NOT EDIT. See generate/cosmetic directory for more info
// ==UserScript==
// @name         Cosmetic Ad Block for Bromite
// @namespace    manhduonghn
// @version      2024.11.14
// @description  Blocks annoying elements in pages, sourced from many different filter lists
// @author       manhduonghn
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @homepage     https://github.com/manhduonghn/userscripts
// @updateURL    https://manhduonghn.github.io/userscripts/cosmetic.user.js
// @downloadURL  https://manhduonghn.github.io/userscripts/cosmetic.user.js
// ==/UserScript==
/// @stats blockers for 9 domains, injected CSS rules for 0 domains
{
    let log = function (...data) {
        console.log("[Cosmetic filters by manhduonghn (v2024.11.14 full)]:", ...data);
    }


    function injectStyle(cssStyle) {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = cssStyle;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    let deduplicatedStrings = ["","#pmadv"];
    let injectionRules = {};
    let rules = {"bongdaplus.vn":".mix-predict,.mix-specs,.mix-stars,.mix-tags,.pad-300.m12.col \u003e .row \u003e div.w6.m12.col \u003e .mix-story,.tip-hot.mix-tips,[href*=\"goc-check-var\"],div.clx:nth-of-type(13),div.clx:nth-of-type(16),div.clz:nth-of-type(7),div.mix-story:nth-of-type(1),div.mix-story:nth-of-type(3),div.row:nth-of-type(15),div.row:nth-of-type(17),main:nth-child(3) \u003e section:last-child \u003e div.cont-wrap \u003e div.row:first-child \u003e div.col.pad-300:first-child \u003e div.mix-cats:nth-child(6) \u003e div.row:nth-child(12) \u003e div.col.m12.w6:last-child","gocphimz.net":1,"hayghe.pro":1,"ios.codevn.net":".swal2-backdrop-show,.swal2-show.swal2-icon-error","m.genk.vn":"#adm-slot-7269","phimmoichill.biz":"#chilladv,#download,#headermbads,#headerpcads,#mobiads,#pcads,#pmadv,.off-ads","phimnhanhz.com":"#container-ads,#popup-giua-man-hinh,.banner-top","truyensextv1.com":"#sticky-footer","vnexpress.net":"#footer \u003e div.width_common.coppy_right_info \u003e .contact_info.width_common \u003e .ads_btn.guitoasoan_btn,#footer \u003e div.width_common.coppy_right_info \u003e .vne_app.app_info.width_common,#newsletters-details \u003e .wrap,#newsletters-footer \u003e .wrap,#newsletters-sidebar \u003e .wrap \u003e .box-newsletter-new__left,#newsletters-top \u003e .wrap,#thongtindoanhnghiep,.bottom.icon-podcast-pin,.box-ebank-qt.box-category,.box-news-other-site.container,.box-raovat-v2.box-category,.box-wiki-kidlab.box-shop-sell-vertical.box-shop-sell.box-category,.button-adblock,.clearfix.box_300_targer.section,.col-right-top,.coppy_right_info.width_common.newsletter_sidebar,.flexbox.header-box-tvol-vs,.fs_parent_box.wrap-box-business.container,.js_installvneapp.installvneapp--small.installvneapp,.list-link,.mb20.section_wrap_poll.inner_section,.newsletters-footer.box-newsletters.mb15.box-newsletter-new,.newsletters-mb-footer.box-newsletters.mb15.box-newsletter-new,.newsletters-sidebar.box-newsletters.mb15.box-newsletter-new,.owl-carousel,.slogan,.ss-content \u003e .downloadapp.contact,.ss-content \u003e div.contact \u003e .ads,.width_common.block_scoll_menu \u003e div.width_common.coppy_right_info \u003e .contact_info.width_common \u003e .ads_btn.guitoasoan_btn,.width_common.block_scoll_menu \u003e div.width_common.coppy_right_info \u003e .vne_app.app_info.width_common,.wrap-contact \u003e .downloadapp.contact,.wrap-contact \u003e div.contact,div.width_common.menu_grid2:nth-of-type(25),div.width_common.menu_grid2:nth-of-type(3),div.wrap-hd-adblock,section.box_category_v2_home.box_category_v2.box_category.section:nth-of-type(16),section.box_category_v2_home.box_category_v2.box_category.section:nth-of-type(24),ul.list-menu-footer:nth-of-type(5)"};
    let defaultRules = rules[""];


    function getRules(host) {
        let domainSplit = host.split(".");

        let output = [];

        for (let i = 0; i < domainSplit.length - 1; i++) {
            let domain = domainSplit.slice(i, domainSplit.length).join(".").toLowerCase();

            log("Checking if we got a rule for", domain);

            let rule = rules[domain];
            if (rule != null) {
                if (typeof rule === 'number') {
                    // the selector is saved at this index in the deduplicatedRules array
                    let realRule = deduplicatedStrings[rule];
                    log("Found deduplicated rule", rule, "for domain", domain);
                    output.push({ "s": realRule });
                } else {
                    // It's a string that directly defines the selector
                    log("Found normal rule for domain", domain);
                    output.push({ "s": rule });
                }
            }

            let injection = injectionRules[domain];
            if (injection != null) {
                if (typeof injection === 'number') {
                    let realInjection = deduplicatedStrings[injection];
                    log("Found deduplicated injection", injection, "for domain", domain);
                    output.push({ "i": realInjection })
                } else {
                    log("Found normal injection for domain", domain);
                    output.push({ "i": injection });
                }
            }
        }

        output.push({ "s": defaultRules, isDefault: true });

        return output;
    }

    let hiddenStyle = "display:none!important;min-height:0!important;height:0!important;z-index:-99999!important;visibility:hidden!important;width:0!important;min-width:0!important;overflow:hidden!important";
    let hideRules = "{" + hiddenStyle + "}"

    let foundRules = getRules(location.host);

    log("Found", foundRules.length, "rules to inject");

    let hiddenElementsSelector = foundRules.filter(r => r["s"] != null)
        .map(r => r["s"]).join(",") + hideRules;

    let cssInjections = foundRules.filter(r => r["i"] != null).map(r => r["i"]).join("");

    let pageSpecificSelectors = foundRules.filter(r => r["s"] != null && !r.isDefault)
        .map(r => r["s"]).join(",");

    log("Page specific selectors:", (pageSpecificSelectors || "(none)"))

    // Source: https://stackoverflow.com/a/61747276
    function elementReady(selector) {
        return new Promise((resolve, reject) => {
            const el = document.querySelector(selector);
            if (el) { resolve(el); }
            new MutationObserver((mutationRecords, observer) => {
                // Query for elements matching the specified selector
                Array.from(document.querySelectorAll(selector)).forEach((element) => {
                    resolve(element);
                    //Once we have resolved we don't need the observer anymore.
                    observer.disconnect();
                });
            })
                .observe(document.documentElement, {
                    childList: true,
                    subtree: false // This was changed to "false" since we only need "head", a direct descendant of the document element
                });
        });
    }

    function hidePageSpecificElements(reason) {
        if (pageSpecificSelectors.length == 0) return;

        log("Searching for elements (" + reason + ")")
        let elems = [...document.querySelectorAll(pageSpecificSelectors)];
        elems.forEach(function (elem) {
            elem.setAttribute("style", hiddenStyle);
        });
        log("Tried hiding", elems.length, "page-specific elements");
    }

    // Now we have hidden a lot of stuff using rules. However, some sites still display elements
    // because they look like <span class="ad" style="display:block">
    // This means that the !important from our css declaration above will not work on these elements (as direct styles take precedence)
    // We need to replace the style of all elements with this selector
    // When the HTML has finished parsing:
    window.addEventListener('DOMContentLoaded', function () {
        hidePageSpecificElements("DOMContentLoaded");

        setTimeout(() => hidePageSpecificElements("DOMContentLoaded + 1000ms"), 1000);
    });
    // And after the page is fully loaded, we do a bunch of checks within the first second or so.
    // If a page pops up a cookie popup after the page has loaded, this one will also defeat it
    window.addEventListener('load', function () {
        hidePageSpecificElements("load - initial");

        function to(offset) {
            let ms = offset * 500;
            setTimeout(() => hidePageSpecificElements("load + " + ms + "ms"), ms);
        };
        for (let i = 1; i <= 5; i++) {
            to(i);
        }
    })

    elementReady('head').then((_) => {
        injectStyle(hiddenElementsSelector);
        log("Injected combined style");

        if (cssInjections.length > 0) {
            injectStyle(cssInjections);
            log("Also injected additional styles (usually fixes for scrolling issues)")
        }
    });
             }
