using System;
using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace ERPTestingApp.Converters
{
    /// <summary>
    /// Converts boolean to Visibility (true = Visible, false = Collapsed)
    /// Inverted version available via parameter "Invert"
    /// </summary>
    public class BoolToVisibilityConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            bool isVisible = value is bool boolValue && boolValue;
            
            // Support inversion via parameter
            if (parameter is string param && param == "Invert")
                isVisible = !isVisible;

            return isVisible ? Visibility.Visible : Visibility.Collapsed;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            bool isVisible = value is Visibility visibility && visibility == Visibility.Visible;
            
            if (parameter is string param && param == "Invert")
                isVisible = !isVisible;

            return isVisible;
        }
    }
}
