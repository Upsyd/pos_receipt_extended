# -*- coding: utf-8 -*-
##############################################################################
#
#    Browseinfo.in
#    Copyright (C) 2004-2010 Tiny SPRL (<http://browseinfo.in>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################


{
    'name': 'Pos Receipt Extended',
    'version': '1.0',
    'category': 'Point of Sale',
    'sequence': 6,
    'author': 'Browseinfo',
    'website':'www.erp-browseinfo.in',
    'depends': ['point_of_sale'],
    'data': [
        'views/custom_extend_view.xml',
        'custom_report.xml',
        'report_receipt.xml',
    ],
    'qweb': ['static/src/xml/custom_receipt.xml'],
    'installable': True,
    'auto_install': False,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
